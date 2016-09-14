import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import {range} from "ramda";
import sinon from "sinon";

import Body from "../src/Body";
import Row from "../src/Row";

describe("Body", () => {

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

    const collection = range(0, 20).map(n => ({id: n.toString()}));

    it("renders a tbody", () => {
        const body = shallow(
            <Body collection={collection} columns={columns} />
        );
        expect(
            body.find("tbody")
        ).to.have.length(1);
    });

    it("renders the correct number of Row components", () => {
        const body = shallow(
            <Body collection={collection} columns={columns} />
        );
        expect(
            body.find(Row)
        ).to.have.length(20);
    });

    describe("on row click", () => {

        it("if a onRowClick function was passed as prop, calls it with the element in the collection corresponding with the clicked row", () => {
            const onRowClick = sinon.spy();
            const body = shallow(
                <Body
                    collection={collection}
                    columns={columns}
                    onRowClick={onRowClick}
                />
            );
            body.find(Row).first().simulate("click");
            expect(onRowClick).to.have.callCount(1);
            expect(onRowClick).to.have.been.calledWith({id: "0"});
            body.find(Row).last().simulate("click");
            expect(onRowClick).to.have.callCount(2);
            expect(onRowClick).to.have.been.calledWith({id: "19"});
        });

        it("if no onRowClick function was passed as prop, doesn't throw errors", () => {
            const body = shallow(
                <Body
                    collection={collection}
                    columns={columns}
                />
            );
            const peacemaker = () => {
                body.find(Row).first().simulate("click");
            };
            expect(peacemaker).not.to.throw();
        });

    });

});
