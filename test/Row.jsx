import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import sinon from "sinon";

import Row from "../src/Row";

describe("Row", () => {

    const valueFormatter1 = sinon.stub().returns("1");
    const valueFormatter2 = sinon.stub().returns("2");
    const valueFormatter3 = sinon.stub().returns("3");
    const valueFormatter4 = sinon.stub().returns("4");

    const columns = [{
        key: "column1",
        formattedKey: "Column1",
        valueFormatter: valueFormatter1
    }, {
        key: "column2",
        formattedKey: "Column2",
        valueFormatter: valueFormatter2
    }, {
        key: "column3",
        formattedKey: "Column3",
        valueFormatter: valueFormatter3
    }, {
        key: "column4",
        formattedKey: "Column4",
        valueFormatter: valueFormatter4
    }];

    const item = {
        id: "1"
    };

    const onClickSpy = sinon.spy();

    const row = shallow(
        <Row
            columns={columns}
            item={item}
            onClick={onClickSpy}
        />
    );

    beforeEach(() => {
        valueFormatter1.reset();
        valueFormatter2.reset();
        valueFormatter3.reset();
        valueFormatter4.reset();
        onClickSpy.reset();
    });

    it("renders a tr", () => {
        expect(
            row.find("tr")
        ).to.have.length(1);
    });

    it("renders a tr with cursor style [CASE: onClick is defined]", () => {
        expect(
            row.find("tr").prop("style")
        ).to.deep.equal({cursor: "pointer"});
    });

    it("renders a tr with cursor style [CASE: onClick is not defined]", () => {
        const rowWithoutOnClickProps = shallow(
            <Row
                columns={columns}
                item={item}
            />
        );
        expect(
            rowWithoutOnClickProps.find("tr").prop("style")
        ).to.deep.equal({cursor: ""});
    });

    it("calls onClick function on tr when this is clicked", () => {
        row.find("tr").simulate("click");
        expect(onClickSpy).to.have.callCount(1);
    });

    it("renders a number of td-s equal to the numbers of columns", () => {
        expect(
            row.find("td")
        ).to.have.length(columns.length);
    });

    it("passes valueFormatter return values as children of td-s", () => {
        row.find("td").forEach((node, index) => {
            expect(
                node.prop("children")
            ).to.equal((index + 1).toString());
        });
    });

});
