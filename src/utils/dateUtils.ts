import dayjs, { type Dayjs } from "dayjs";

type DisableDateProps = {
  current: Dayjs;
  compareDate?: Dayjs;
  greaterThan?: boolean;
  lessThan?: boolean;
  greaterOrEqual?: boolean;
  lessOrEqual?: boolean;
};

class DateUtils {
  static toDayJS(date?: string) {
    if (!date) {
      return "";
    }

    return dayjs(date);
  }

  static formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  static getDaysLeft(date: string): number {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static disableDate({
    current,
    compareDate,
    greaterOrEqual,
    greaterThan,
    lessOrEqual,
    lessThan,
  }: DisableDateProps): boolean {
    const _compareDate = compareDate || dayjs();

    if (greaterOrEqual) {
      return current < _compareDate;
    }

    if (greaterThan) {
      return current <= _compareDate;
    }

    if (lessOrEqual) {
      return current > _compareDate;
    }

    if (lessThan) {
      return current >= _compareDate;
    }

    return false;
  }
}

export { DateUtils };
