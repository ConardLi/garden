import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';

const secret = JSON.parse(
  readFileSync(join(process.cwd(), 'src/config/secret.json'), 'utf-8')
);

// 定义权限验证选项接口
interface AuthOptions {
  // 允许访问的用户ID列表
  allowedUserIds?: string[];
  // 允许访问的角色列表
  allowedRoles?: string[];
  // 自定义验证函数
  validator?: (user: any, request: NextRequest) => boolean | Promise<boolean>;
  // 自定义错误消息
  errorMessage?: string;
}

type HandlerFunction = (request: NextRequest, ...args: any[]) => Promise<NextResponse>;

// 权限验证高阶函数
export function requireAuth(options?: AuthOptions): HandlerFunction;
export function requireAuth(handler: HandlerFunction): HandlerFunction;
export function requireAuth(options: AuthOptions, handler: HandlerFunction): HandlerFunction;
export function requireAuth(
  optionsOrHandler?: AuthOptions | HandlerFunction,
  handler?: HandlerFunction
): HandlerFunction {
  return async function (request: NextRequest, ...args: any[]) {
    try {
      // 从请求头获取 token
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return NextResponse.json(
          { error: '未登录' },
          { status: 401 }
        );
      }

      // 验证 token
      const decoded: any = verify(token, secret.jwtSecret);
      
      // 将用户信息添加到请求对象中
      (request as any).user = decoded;

      // 处理验证选项
      const options = typeof optionsOrHandler === 'object' ? optionsOrHandler : undefined;
      const finalHandler = typeof optionsOrHandler === 'function' ? optionsOrHandler : handler;

      // 如果有权限选项，进行权限验证
      if (options) {
        // 验证用户ID
        if (options.allowedUserIds?.length > 0) {
          if (!options.allowedUserIds.includes(decoded.userId)) {
            return NextResponse.json(
              { error: options.errorMessage || '没有权限访问此接口' },
              { status: 403 }
            );
          }
        }

        // 验证角色（暂时仅支持验证管理员）
        if (options.allowedRoles?.length > 0) {
          if(!secret.adminUserId === decoded.nickname){
          // if (!options.allowedRoles.includes(decoded.role)) {
            return NextResponse.json(
              { error: options.errorMessage || '当前角色无权访问此接口' },
              { status: 403 }
            );
          }
        }

        // 执行自定义验证
        if (options.validator) {
          const isValid = await options.validator(decoded, request);
          if (!isValid) {
            return NextResponse.json(
              { error: options.errorMessage || '验证失败' },
              { status: 403 }
            );
          }
        }
      }

      // 如果有处理函数，执行它
      if (finalHandler) {
        return finalHandler(request, ...args);
      }

      // 默认返回成功
      return NextResponse.json({
        success: true,
        data: { user: decoded }
      });
    } catch (error) {
      return NextResponse.json(
        { error: '登录已过期' },
        { status: 401 }
      );
    }
  };
}
