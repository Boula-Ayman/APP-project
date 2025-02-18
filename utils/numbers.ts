import { ENGLISH_NUMBERS, ARABIC_NUMBERS } from "@/constants/Numbers";

export const localizeNumber = (number: number, language = "en") => {
  const numberWithoutPoint = number.toString().split(".");
  const localizedNumberWithoutPoint = numberWithoutPoint.map((n) => {
    const numberDigits = n
      .toString()
      .split("")
      .map((digit) => parseInt(digit));
    let localizedNumberDigits;
    if (language === "en") {
      localizedNumberDigits = numberDigits.map(
        (digit) => ENGLISH_NUMBERS[digit]
      );
    } else {
      localizedNumberDigits = numberDigits.map(
        (digit) => ARABIC_NUMBERS[digit]
      );
    }
    return localizedNumberDigits.join("");
  });
  return localizedNumberWithoutPoint.join(".");
};
