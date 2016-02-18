import React from "react";
import chai, {expect} from "chai";
import $ from "teaspoon";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import Row from "row";

chai.use(sinonChai);

describe("`Row` component", () => {

    const valueFormatter1 = sinon.stub().returns("1");
    const valueFormatter2 = sinon.stub().returns("2");
    const valueFormatter3 = sinon.stub().returns("3");
    const valueFormatter4 = sinon.stub().returns("4");

    const columns = [{
        key: "column1",
        formattedKey: "Column 1",
        valueFormatter: valueFormatter1
    }, {
        key: "column2",
        formattedKey: "Column 2",
        valueFormatter: valueFormatter2
    }, {
        key: "column3",
        formattedKey: "Column 3",
        valueFormatter: valueFormatter3
    }, {
        key: "column4",
        formattedKey: "Column 4",
        valueFormatter: valueFormatter4
    }];

    const item = {
        id: "1"
    };

    const onClickSpy = sinon.spy();

    const $Row = $(
        <Row
            columns={columns}
            item={item}
            onClick={onClickSpy}
        />
    ).shallowRender();

    beforeEach(() => {
        valueFormatter1.reset();
        valueFormatter2.reset();
        valueFormatter3.reset();
        valueFormatter4.reset();
        onClickSpy.reset();
    });

    it("renders a `tr`", () => {
        expect($Row.find("tr").length).to.equal(1);
    });

    it("renders a `tr` with cursor style [CASE: onClick is defined]", () => {
        expect($Row.find("tr").props().style).to.deep.equal({cursor: "pointer"});
    });

    it("renders a `tr` with cursor style [CASE: onClick is not defined]", () => {
        const $RowWithoutOnClickProps = $(
            <Row
                columns={columns}
                item={item}
            />
        ).shallowRender();
        expect($RowWithoutOnClickProps.find("tr").props().style).to.deep.equal({cursor: ""});
    });

    it("call `onClick` function on `tr` when this is clicked", () => {
        $Row.find("tr").trigger("click");
        expect(onClickSpy).to.have.callCount(1);
    });

    it("renders a number of `td` equal to the numbers of columns", () => {
        expect($Row.find("td").length).to.equal(columns.length);
    });

    it("pass `valueFormatter` as children of `td`", () => {
        $Row.find("td").map((node, index) => {
            expect(node.props.children).to.equal((index + 1).toString());
        });
    });

});
