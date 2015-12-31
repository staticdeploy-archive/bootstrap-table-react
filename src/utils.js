import {title} from "change-case";
import {is, toString} from "ramda";

function fromString (column) {
    return {
        key: column,
        formattedKey: title(column),
        valueFormatter: toString
    };
}
function fromObject (column) {
    return {
        key: column.key,
        formattedKey: column.formattedKey || title(column.key),
        valueFormatter: column.valueFormatter || toString
    };
}
export function normalizeColumns (columns) {
    return columns.map(column => (
        is(String, column) ? fromString(column) : fromObject(column)
    ));
}
