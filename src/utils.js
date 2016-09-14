import {title} from "change-case";

function stringify (thing) {
    if (thing === undefined) {
        return "";
    }
    if (thing === null) {
        return "null";
    }
    return thing.toString();
}
function fromString (column) {
    return {
        key: column,
        formattedKey: title(column),
        valueFormatter: stringify
    };
}
function fromObject (column) {
    return {
        key: column.key,
        formattedKey: column.formattedKey || title(column.key),
        valueFormatter: column.valueFormatter || stringify
    };
}
export function normalizeColumns (columns) {
    return columns.map(column => (
        typeof column === "string" ? fromString(column) : fromObject(column)
    ));
}
