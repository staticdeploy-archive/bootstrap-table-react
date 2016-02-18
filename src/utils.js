import {title} from "change-case";
import R from "ramda";

function stringify (thing) {
    // ramda's toString surrounds strings with quotes, avoid that
    return R.is(String, thing) ? thing : R.toString(thing);
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
        R.is(String, column) ? fromString(column) : fromObject(column)
    ));
}
