import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';

const secret = JSON.parse(
  readFileSync(join(process.cwd(), 'src/config/secret.json'), 'utf-8')
).jwtSecret;

// 生成一个测试用的 token
const generateTestToken = () => {
  return sign(
    { 
      id: '123',
      nickname: 'test user',
      role: 'user'
    },
    secret,
    { expiresIn: '1h' }
  );
};

// 测试 GET 接口
async function testProtectedGet() {
  console.log('测试 GET 接口:');
  
  // 测试未携带 token
  console.log('\n1. 测试未携带 token:');
  const noTokenResponse = await fetch('http://localhost:3002/api/example/protected');
  console.log('状态码:', noTokenResponse.status);
  console.log('响应:', await noTokenResponse.json());

  // 测试携带有效 token
  console.log('\n2. 测试携带有效 token:');
  const validTokenResponse = await fetch('http://localhost:3002/api/example/protected', {
    headers: {
      'Authorization': `Bearer ${generateTestToken()}`
    }
  });
  console.log('状态码:', validTokenResponse.status);
  console.log('响应:', await validTokenResponse.json());

  // 测试携带无效 token
  console.log('\n3. 测试携带无效 token:');
  const invalidTokenResponse = await fetch('http://localhost:3002/api/example/protected', {
    headers: {
      'Authorization': 'Bearer invalid.token.here'
    }
  });
  console.log('状态码:', invalidTokenResponse.status);
  console.log('响应:', await invalidTokenResponse.json());
}

// 测试 POST 接口
async function testProtectedPost() {
  console.log('\n测试 POST 接口:');
  
  const testData = {
    message: '测试数据'
  };

  // 测试未携带 token
  console.log('\n1. 测试未携带 token:');
  const noTokenResponse = await fetch('http://localhost:3002/api/example/protected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  });
  console.log('状态码:', noTokenResponse.status);
  console.log('响应:', await noTokenResponse.json());

  // 测试携带有效 token
  console.log('\n2. 测试携带有效 token:');
  const validTokenResponse = await fetch('http://localhost:3002/api/example/protected', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${generateTestToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  });
  console.log('状态码:', validTokenResponse.status);
  console.log('响应:', await validTokenResponse.json());

  // 测试携带无效 token
  console.log('\n3. 测试携带无效 token:');
  const invalidTokenResponse = await fetch('http://localhost:3002/api/example/protected', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer invalid.token.here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  });
  console.log('状态码:', invalidTokenResponse.status);
  console.log('响应:', await invalidTokenResponse.json());
}

// 运行测试
async function runTests() {
  try {
    await testProtectedGet();
    await testProtectedPost();
  } catch (error) {
    console.error('测试出错:', error);
  }
}

// 执行测试
runTests();
