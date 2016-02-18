import React, {PropTypes, Component} from "react";

import {column} from "./types";

export default class Row extends Component {

    static propTypes = {
        columns: PropTypes.arrayOf(column).isRequired,
        item: PropTypes.object.isRequired,
        onClick: PropTypes.func
    };

    renderCell (column) {
        const {item} = this.props;
        const value = item[column.key];
        return (
            <td key={column.key}>
                {column.valueFormatter(value, item)}
            </td>
        );
    }

    render () {
        const {columns, onClick} = this.props;
        return (
            <tr onClick={onClick} style={{cursor: onClick ? "pointer" : ""}}>
                {columns.map(::this.renderCell)}
            </tr>
        );
    }

}
