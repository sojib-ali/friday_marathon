// utils/dobUtils.js

export const currentYear = new Date().getFullYear();

// Generate last 120 years (including current year)
export const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

// Month names with values as strings (1–12)
export const months = [
  { value: "1", name: "January" },
  { value: "2", name: "February" },
  { value: "3", name: "March" },
  { value: "4", name: "April" },
  { value: "5", name: "May" },
  { value: "6", name: "June" },
  { value: "7", name: "July" },
  { value: "8", name: "August" },
  { value: "9", name: "September" },
  { value: "10", name: "October" },
  { value: "11", name: "November" },
  { value: "12", name: "December" },
];

/**
 * Returns number of days in a given month and year.
 * Handles leap years correctly for February.
 */
export const getDaysInMonth = (month, year) => {
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  if (!monthInt || !yearInt) return 31;

  // February
  if (monthInt === 2) {
    const isLeapYear =
      (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
    return isLeapYear ? 29 : 28;
  }

  // April, June, September, November have 30 days
  if ([4, 6, 9, 11].includes(monthInt)) return 30;

  // All others have 31 days
  return 31;
};
