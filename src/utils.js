import {title} from "change-case";
import {is, toString} from "ramda";

function stringify (thing) {
    // ramda's toString surrounds strings with quotes, avoid that
    return is(String, thing) ? thing : toString(thing);
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
        is(String, column) ? fromString(column) : fromObject(column)
    ));
}
