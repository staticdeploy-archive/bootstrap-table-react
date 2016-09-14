[![npm version](https://badge.fury.io/js/bootstrap-table-react.svg)](https://badge.fury.io/js/bootstrap-table-react)
[![Build Status](https://travis-ci.org/staticdeploy/bootstrap-table-react.svg?branch=master)](https://travis-ci.org/staticdeploy/bootstrap-table-react)
[![Dependency Status](https://david-dm.org/staticdeploy/bootstrap-table-react.svg)](https://david-dm.org/staticdeploy/bootstrap-table-react)
[![devDependency Status](https://david-dm.org/staticdeploy/bootstrap-table-react/dev-status.svg)](https://david-dm.org/staticdeploy/bootstrap-table-react#info=devDependencies)

# bootstrap-table-react

A simple bootstrap table in react.

## propTypes

A snippet is worth a thousand words.

```js
const column = PropTypes.shape({
    key: PropTypes.string.isRequired,
    formattedKey: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    valueFormatter: PropTypes.func
});

const item = PropTypes.shape({
    id: PropTypes.string.isRequired
});

export default class Table {

    static propTypes = {
        className: PropTypes.string,
        collection: PropTypes.arrayOf(item).isRequired,
        columns: PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, column])
        ).isRequired,
        onRowClick: PropTypes.func,
        tableOptions: PropTypes.shape({
            bordered: PropTypes.bool,
            condensed: PropTypes.bool,
            hover: PropTypes.bool,
            responsive: PropTypes.bool,
            striped: PropTypes.bool
        })
    }

    // ...

}
```
