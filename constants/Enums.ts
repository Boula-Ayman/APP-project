export const PROPERTIES_STATUS = Object.freeze({
  available: 'available',
  soldOut: 'sold out',
  all: 'all',
});

export type PropertiesStatusKeys = keyof typeof PROPERTIES_STATUS;

export const ARABIC_DAYS = Object.freeze({
  SUNDAY: 'أحد',
  MONDAY: 'أثنين',
  TUESDAY: 'ثلاثاء',
  WEDNESDAY: 'أربعاء',
  THURSDAY: 'خميس',
  FRIDAY: 'جمعة',
  SATURDAY: 'سبت',
});

export const SHORT_ARABIC_DAYS = Object.freeze({
  SUNDAY: 'أح',
  MONDAY: 'أث',
  TUESDAY: 'ث',
  WEDNESDAY: 'أر',
  THURSDAY: 'خ',
  FRIDAY: 'ج',
  SATURDAY: 'س',
});

export const ARABIC_MONTHS = Object.freeze({
  JANUARY: 'يناير',
  FEBRUARY: 'فبراير',
  MARCH: 'مارس',
  APRIL: 'أبريل',
  MAY: 'مايو',
  JUNE: 'يونيو',
  JULY: 'يوليو',
  AUGUST: 'أغسطس',
  SEPTEMBER: 'سبتمبر',
  OCTOBER: 'أكتوبر',
  NOVEMBER: 'نوفمبر',
  DECEMBER: 'ديسمبر',
});
