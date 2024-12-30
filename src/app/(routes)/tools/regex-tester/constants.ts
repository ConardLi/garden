interface RegexTemplate {
  name: string;
  pattern: string;
  description: string;
  example: string;
}

export const REGEX_TEMPLATES: RegexTemplate[] = [
  {
    name: 'URL',
    pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
    description: '匹配URL地址',
    example: 'https://www.example.com/path',
  },
  {
    name: 'Email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: '匹配电子邮件地址',
    example: 'example@email.com',
  },
  {
    name: '手机号码',
    pattern: '^1[3-9]\\d{9}$',
    description: '匹配中国大陆手机号码',
    example: '13812345678',
  },
  {
    name: '身份证号',
    pattern: '^[1-9]\\d{5}(19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[0-9X]$',
    description: '匹配中国大陆身份证号',
    example: '110101199001011234',
  },
  {
    name: 'IPv4地址',
    pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    description: '匹配IPv4地址',
    example: '192.168.1.1',
  },
  {
    name: '日期',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    description: '匹配YYYY-MM-DD格式的日期',
    example: '2024-03-15',
  },
  {
    name: '时间',
    pattern: '^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$',
    description: '匹配HH:mm:ss格式的时间',
    example: '23:59:59',
  },
  {
    name: '用户名',
    pattern: '^[a-zA-Z][a-zA-Z0-9_]{3,15}$',
    description: '字母开头，允许4-16字节，允许字母数字下划线',
    example: 'user_123',
  },
  {
    name: '强密码',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    description: '至少8位，包含大小写字母、数字和特殊字符',
    example: 'Test123!@',
  },
  {
    name: '中文字符',
    pattern: '^[\\u4e00-\\u9fa5]+$',
    description: '匹配中文字符',
    example: '中文测试',
  },
  {
    name: '文件路径',
    pattern: '^(/[^/ ]*)+/?$',
    description: '匹配Linux风格的文件路径',
    example: '/path/to/file',
  },
  {
    name: '十六进制颜色',
    pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
    description: '匹配CSS十六进制颜色值',
    example: '#FF0000',
  },
]; 