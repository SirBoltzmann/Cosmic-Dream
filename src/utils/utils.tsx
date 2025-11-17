import { Timestamp } from "firebase/firestore";

export function getDate(date: Timestamp) {
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "medium",
    }).format(date.toDate());
}