import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

const dateFilterPredicate = (value, filter) => {
  const filterDate = dayjs(filter.value);
  return dayjs(value).isBetween(filterDate, filterDate.add(3, "day"));
};

export default dateFilterPredicate;
