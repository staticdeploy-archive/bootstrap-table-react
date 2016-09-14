import {PropTypes} from "react";

export const column = PropTypes.shape({
    key: PropTypes.string.isRequired,
    formattedKey: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    valueFormatter: PropTypes.func
});

export const item = PropTypes.shape({
    id: PropTypes.string.isRequired
});
