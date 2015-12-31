import React, {PropTypes, Component} from "react";

import Row from "./row";
import {column, item} from "./types";

export default class Body extends Component {

    static propTypes = {
        collection: PropTypes.arrayOf(item).isRequired,
        columns: PropTypes.arrayOf(column).isRequired,
        onRowClick: PropTypes.func
    }

    render () {
        const {columns, collection, onRowClick} = this.props;
        return (
            <tbody>
                {collection.map((item, index) => (
                    <Row
                        columns={columns}
                        item={item}
                        key={item.id}
                        onClick={() => onRowClick(collection[index])}
                    />
                ))}
            </tbody>
        );
    }

}
