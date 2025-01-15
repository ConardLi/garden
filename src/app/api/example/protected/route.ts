import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/utils/server/auth-decorator';

// 基本的登录验证
export const GET = requireAuth(async (request: NextRequest) => {
  const user = (request as any).user;
  
  return NextResponse.json({
    success: true,
    data: {
      message: '这是一个只需要登录的接口',
      user
    }
  });
});

// 需要特定用户ID和角色才能访问
export const POST = requireAuth(
  {
    allowedUserIds: ['123', '456'], // 只允许这些用户ID访问
    allowedRoles: ['admin', 'editor'], // 只允许这些角色访问
    errorMessage: '您没有权限执行此操作'
  },
  async (request: NextRequest) => {
    const user = (request as any).user;
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      data: {
        message: '这是一个需要特定权限的接口',
        user,
        body
      }
    });
  }
);

// 使用自定义验证函数
export const PUT = requireAuth(
  {
    validator: async (user, request) => {
      // 示例：检查用户是否有足够的积分
      const userPoints = user.points || 0;
      return userPoints >= 100;
    },
    errorMessage: '需要至少100积分才能执行此操作'
  },
  async (request: NextRequest) => {
    const user = (request as any).user;
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      data: {
        message: '这是一个使用自定义验证的接口',
        user,
        body
      }
    });
  }
);
