import classNames from "classnames";
import React, {PropTypes, Component} from "react";

import Body from "./body";
import Head from "./head";
import {column, item} from "./types";
import {normalizeColumns} from "./utils";

export default class Table extends Component {

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
    };

    getTableClassName () {
        const {tableOptions = {}} = this.props;
        return classNames("table", this.props.className, {
            "table-bordered": tableOptions.bordered,
            "table-condensed": tableOptions.condensed,
            "table-hover": tableOptions.hover,
            "table-responsive": tableOptions.responsive,
            "table-striped": tableOptions.striped
        });
    }

    render () {
        const columns = normalizeColumns(this.props.columns);
        return (
            <table className={this.getTableClassName()}>
                <Head columns={columns} />
                <Body
                    collection={this.props.collection}
                    columns={columns}
                    onRowClick={this.props.onRowClick}
                />
            </table>
        );
    }

}
