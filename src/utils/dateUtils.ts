class DateUtils {
  static formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  static getDaysLeft(date: string): number {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

export { DateUtils };
