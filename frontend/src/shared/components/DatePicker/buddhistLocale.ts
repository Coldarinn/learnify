import ru from "antd/es/date-picker/locale/ru_RU"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import buddhistEra from "dayjs/plugin/buddhistEra"
import "dayjs/locale/ru"

dayjs.locale("ru")
dayjs.extend(buddhistEra)
dayjs.extend(advancedFormat)

export const buddhistLocale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: "DD.MM.YYYY",
    fieldWeekFormat: "ww YYYY",
    fieldMonthFormat: "MM.YYYY",
    fieldQuarterFormat: "Q YYYY",
    fieldTimeFormat: "HH:mm:ss",
    fieldDateTimeFormat: "DD.MM.YYYY HH:mm:ss",
    yearFormat: "YYYY",
    cellYearFormat: "YYYY",
    monthFormat: "MMMM",
  },
}
