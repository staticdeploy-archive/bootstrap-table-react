import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";

import Head from "../src/Head";

describe("Head", () => {

    const columns = [{
        key: "column1",
        formattedKey: "Column1"
    }, {
        key: "column2",
        formattedKey: "Column2"
    }, {
        key: "column3",
        formattedKey: "Column3"
    }, {
        key: "column4",
        formattedKey: "Column4"
    }];

    const head = shallow(
        <Head columns={columns} />
    );

    it("renders a thead and a tr", () => {
        expect(
            head.find("thead")
        ).to.have.length(1);
        expect(
            head.find("tr")
        ).to.have.length(1);
    });

    it("renders the correct number of columns", () => {
        expect(
            head.find("th")
        ).to.have.length(columns.length);
    });

    it("renders the columns with the correct key and children", () => {
        head.find("th").forEach((node, index) => {
            expect(
                node.key()
            ).to.equal(columns[index].key);
            expect(
                node.prop("children")
            ).to.equal(columns[index].formattedKey);
        });
    });

});
