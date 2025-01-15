import { NextResponse } from 'next/server';
import { verifySignature, loginSessions } from '@/utils/server/wechat';
import { XMLParser } from 'fast-xml-parser';

export async function GET(request: Request) {
  try {
    console.log('Received GET request for verification');
    const { searchParams } = new URL(request.url);
    const signature = searchParams.get('signature') || '';
    const timestamp = searchParams.get('timestamp') || '';
    const nonce = searchParams.get('nonce') || '';
    const echostr = searchParams.get('echostr') || '';

    console.log('Params:', { signature, timestamp, nonce, echostr });

    // 简单返回 echostr 进行验证
    return new NextResponse(echostr);
  } catch (error) {
    console.error('Verification error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Received POST request');
    const { searchParams } = new URL(request.url);
    const signature = searchParams.get('signature') || '';
    const timestamp = searchParams.get('timestamp') || '';
    const nonce = searchParams.get('nonce') || '';

    // 验证签名
    if (!verifySignature(signature, timestamp, nonce)) {
      console.log('Invalid signature');
      return new NextResponse('Invalid signature', { status: 403 });
    }

    // 解析XML消息
    const xml = await request.text();
    console.log('Received XML:', xml);
    
    const parser = new XMLParser();
    const result = parser.parse(xml);
    const message = result.xml;
    console.log('Parsed message:', message);

    // 处理扫码事件
    if (message.Event === 'SCAN' || (message.Event === 'subscribe' && message.EventKey)) {
      const sceneStr = message.EventKey.replace('qrscene_', '');
      console.log('Processing scan event for scene:', sceneStr);
      
      const session = loginSessions.get(sceneStr);
      if (session) {
        session.status = 'scanned';
        session.openid = message.FromUserName;
        console.log('Updated session:', session);
      } else {
        console.log('Session not found for scene:', sceneStr);
      }
    }

    // 返回成功
    return new NextResponse('success');
  } catch (error) {
    console.error('Callback error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}


// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const echostr = searchParams.get('echostr');
//   return new NextResponse(echostr);
// }

// export async function POST(request: Request) {
//   return new NextResponse('success');
// }