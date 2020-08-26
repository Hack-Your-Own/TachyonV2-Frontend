import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

const dateFilterPredicate = (value, filter) => {
  // Raw date string - "08/26/2020 - 08/29/2020"
  const rawFilterDates = filter.value.split("-");
  const date = dayjs(rawFilterDates[0]);
  const nextDate = dayjs(rawFilterDates[1]);

  // Match "null" values
  if (filter.value === "null") {
    return filter.value === value;
  }

  if (!date.isValid()) {
    return false;
  }

  // Match dates b/w date & nextDate, if nextDate is invalid, match next 3 dates
  return dayjs(value).isBetween(
    date,
    nextDate.isValid() ? nextDate : date.add(4, "day"),
    "day",
    // Inclusive of start date but excludes nextDate
    "[)"
  );
};

export default dateFilterPredicate;
