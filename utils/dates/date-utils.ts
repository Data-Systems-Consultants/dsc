import * as fns from "date-fns";

const toLocalDate = (date: Date): Date => {
  let tz = date.getTimezoneOffset();
  date.setHours(date.getHours() - tz / 60);
  return date;
};

const stringToDate = (dateString: string): Date | null => {
  if (dateString.trim().length < 11) {
    dateString += " 00:00:00";
  }

  if (dateString.indexOf("Z") !== -1) {
    return new Date(dateString);
  }

  const commonFormats = [
    "MM/dd/yyyy hh:mm:ss a", // 08/28/2023 14:30:00 PM
    "yyyy-MM-dd hh:mm:ss a", // 2023-08-29 14:30:00 PM
    "yyyy-MM-dd HH:mm:ss.SSS", // 2023-08-28 05:45:02.000
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", // 2011-10-05T14:48:00.000Z
    "yyyy-MM-dd HH:mm:ss", // 2023-08-28 14:30:00
    "MM/dd/yyyy HH:mm:ss", // 08/28/2023 14:30:00
    "dd.MM.yyyy HH:mm:ss", // 28.08.2023 14:30:00
    "yyyy-MM-dd", // 2023-01-01
    "MM/dd/yyyy", // 01/01/2023
  ];

  for (const format of commonFormats) {
    let parsedDate = fns.parse(dateString, format, new Date());

    if (parsedDate.toString() !== "Invalid Date") {
      return parsedDate;
    }
  }

  return null;
};

export const getLocalDate = (obj: Date = new Date()): Date | null => {
  if (fns.isDate(obj)) {
    return toLocalDate(obj);
  } else {
    if (obj) {
      obj = stringToDate(obj.toString()) as Date;
      return toLocalDate(obj);
    }
  }

  return null;
};

export const format = (date: string | Date, format: string) => {
  if (!fns.isDate(date)) {
    date = stringToDate(date as string) as Date;
  }

  return fns.format(date as Date, format);
};
