/**
 * 拉取 bing 壁纸脚本
 */

const mongoose = require('mongoose');
const https = require('https');

// MongoDB 连接配置
const MONGODB_URI = 'mongodb://127.0.0.1:27017/web-tools';

// 定义必应壁纸的 Schema
const BingWallpaperSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  enddate: { type: String, required: true },
  copyright: { type: String, required: true },
  fullSrc: { type: String, required: true },
  urlbase: { type: String, required: true },
  raw: { type: String, required: true },
  thumb: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// 创建索引
BingWallpaperSchema.index({ enddate: -1 });
BingWallpaperSchema.index({ urlbase: 1 });

// 创建模型
const BingWallpaperModel = mongoose.model('BingWallpaper', BingWallpaperSchema);

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'fp': '6RM2d_jIMh.1732624981',
        'mode': 'itab',
        'origin': 'chrome-extension://mhloojimgilafopcmlcikiidgbbnelip',
        'priority': 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'signaturekey': 'U2FsdGVkX1+QQlEjT7RzeIECQTvM2fWdGe7vtOH836g=',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      }
    };

    console.log('请求选项:', options);

    const req = https.get(url, options, (res) => {
      console.log('响应状态码:', res.statusCode);
      console.log('响应头:', res.headers);

      let data = '';

      // 接收数据片段
      res.on('data', (chunk) => {
        data += chunk;
      });

      // 数据接收完成
      res.on('end', () => {
        console.log('原始响应数据:', data);
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          console.error('JSON解析错误:', e);
          reject(e);
        }
      });
    });

    req.on('error', (err) => {
      console.error('请求错误:', err);
      reject(err);
    });

    req.end();
  });
}

async function fetchBingImages(page, size = 20) {
  console.log(11, `https://api.codelife.cc/bing/list?lang=cn&page=${page}&size=${size}`);
  try {
    const data = await httpGet(
      `https://api.codelife.cc/bing/list?lang=cn&page=${page}&size=${size}`
    );

    if (data.code !== 200) {
      throw new Error(`API 请求失败: ${data.msg}`);
    }

    return data.data;
  } catch (error) {
    console.error('获取必应壁纸失败:', error);
    return [];
  }
}

async function saveToDB(images) {
  try {
    // 批量插入，如果存在则更新
    const operations = images.map((image) => ({
      updateOne: {
        filter: { _id: image._id },
        update: {
          $set: {
            ...image,
            updatedAt: new Date(),
          },
        },
        upsert: true,
      },
    }));

    const result = await BingWallpaperModel.bulkWrite(operations);
    console.log(`成功处理 ${result.upsertedCount + result.modifiedCount} 条数据`);
    return result;
  } catch (error) {
    console.error('保存到数据库失败:', error);
    throw error;
  }
}

async function main() {
  try {
    // 连接数据库
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('数据库连接成功');

    let page = 1;
    const size = 16;  // 改为16，与API默认值一致
    let totalImported = 0;
    let hasMore = true;

    while (hasMore) {
      console.log(`正在获取第 ${page} 页数据...`);
      const images = await fetchBingImages(page, size);

      if (!images || images.length === 0) {
        console.log('没有更多数据了');
        break;
      }

      await saveToDB(images);
      totalImported += images.length;
      console.log(`已导入 ${totalImported} 张图片`);

      // 如果获取的数据少于请求的大小，说明已经到最后一页
      if (images.length < size) {
        console.log('已到达最后一页');
        hasMore = false;
      } else {
        page++;
        // 添加延时，避免请求过快
        console.log('等待1秒后继续...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('导入完成，总共导入', totalImported, '张图片');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('导入过程出错:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

main();
