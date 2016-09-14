import React, {PropTypes, Component} from "react";

import * as modulePropTypes from "./modulePropTypes";
import Row from "./Row";

export default class Body extends Component {

    static propTypes = {
        collection: PropTypes.arrayOf(modulePropTypes.item).isRequired,
        columns: PropTypes.arrayOf(modulePropTypes.column).isRequired,
        onRowClick: PropTypes.func
    };

    render () {
        const {columns, collection, onRowClick} = this.props;
        return (
            <tbody>
                {collection.map((item, index) => (
                    <Row
                        columns={columns}
                        item={item}
                        key={item.id}
                        onClick={onRowClick && (
                            () => onRowClick(collection[index])
                        )}
                    />
                ))}
            </tbody>
        );
    }

}
