import React from "react";
import {expect} from "chai";
import $ from "teaspoon";

import Head from "../src/head";

describe("`Head` component", () => {

    const columns = [{
        key: "column1",
        formattedKey: "Column 1"
    }, {
        key: "column2",
        formattedKey: "Column 2"
    }, {
        key: "column3",
        formattedKey: "Column 3"
    }, {
        key: "column4",
        formattedKey: "Column 4"
    }];

    const $Head = $(<Head columns={columns} />).shallowRender();

    it("renders a `thead` and a `tr`", () => {
        expect($Head.find("thead").length).to.equal(1);
        expect($Head.find("tr").length).to.equal(1);
    });

    it("renders the correct number of columns", () => {
        expect($Head.find("th").length).to.equal(columns.length);
    });

    it("renders the columns with the correct `key` and `children`", () => {
        $Head.find("th").map((node, index) => {
            expect(node.key).to.equal(columns[index].key);
            expect(node.props).to.deep.equal({children: columns[index].formattedKey});
        });
    });

});
