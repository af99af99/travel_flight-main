
import dayjs from "dayjs";

export function getTime(departureTime, getType) {
    if (getType === "date") {
        return dayjs(departureTime).format("ddd, DD MMM YYYY");
    } else if (getType === "time") {
        return dayjs(departureTime).format("HH:mm");
    } else {
        return "False Input";
    }
}