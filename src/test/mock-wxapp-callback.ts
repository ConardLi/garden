/**
 * 模拟小程序回调的测试脚本
 * 使用方法：
 * 1. 先在网页端打开登录弹窗，获取二维码ID
 * 2. 运行脚本：ts-node src/test/mock-wxapp-callback.ts <qrcodeId>
 */

async function mockWxAppCallback() {
  const qrcodeId = process.argv[2];
  
  if (!qrcodeId) {
    console.error('请提供二维码ID');
    console.error('使用方法: ts-node src/test/mock-wxapp-callback.ts <qrcodeId>');
    process.exit(1);
  }

  try {
    const response = await fetch('http://localhost:3002/api/auth/wxapp/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qrcodeId,
        code: 'mock-code',
        userInfo: {
          nickName: '测试用户',
          avatarUrl: 'https://garden-1257917459.cos.ap-beijing.myqcloud.com/website-icons/8_notion-ai-icon.png'
        }
      })
    });

    const data = await response.json();
    console.log('回调结果:', data);
  } catch (error) {
    console.error('回调失败:', error);
  }
}

mockWxAppCallback(); 