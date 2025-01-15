const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export function formatDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = date.getDay();
  
  return `${month}月${day}日 星期${WEEKDAYS[weekDay]}`;
}
