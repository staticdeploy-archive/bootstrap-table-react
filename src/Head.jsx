import React, {PropTypes, Component} from "react";

import * as modulePropTypes from "./modulePropTypes";

export default class Head extends Component {

    static propTypes = {
        columns: PropTypes.arrayOf(modulePropTypes.column)
    };

    renderCell ({key, formattedKey}) {
        return (
            <th key={key}>
                {formattedKey}
            </th>
        );
    }

    render () {
        const {columns} = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(this.renderCell)}
                </tr>
            </thead>
        );
    }

}
