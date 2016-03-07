import React from "react";
import chai, {expect} from "chai";
import $ from "teaspoon";
import {range} from "ramda";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import Body from "../src/body";

chai.use(sinonChai);

describe("`Body` component", () => {

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

    const collection = range(0, 20).map(n => ({id: n.toString()}));

    it("renders a `tbody`", () => {
        const $Body = $(<Body collection={collection} columns={columns} />).shallowRender();
        expect($Body.find("tbody").length).to.equal(1);
    });

    it("renders the correct number of `Row` component", () => {
        const $Body = $(<Body collection={collection} columns={columns} />).shallowRender();
        expect($Body.find("Row").length).to.equal(collection.length);
    });

    describe("on row click", () => {

        it("if a `onRowClick` function was passed as prop, calls it with the element in the collection corresponding with the clicked row", () => {
            const onRowClick = sinon.spy();
            const $Body = $(
                <Body
                    collection={collection}
                    columns={columns}
                    onRowClick={onRowClick}
                />
            ).shallowRender();
            $Body.find("Row").first().trigger("click");
            expect(onRowClick).to.have.callCount(1);
            expect(onRowClick).to.have.been.calledWith({id: "0"});
            $Body.find("Row").last().trigger("click");
            expect(onRowClick).to.have.callCount(2);
            expect(onRowClick).to.have.been.calledWith({id: "19"});
        });

        it("if no `onRowClick` function was passed as prop, doesn't throw errors", () => {
            const peacemaker = () => {
                const $Body = $(
                    <Body
                        collection={collection}
                        columns={columns}
                    />
                ).shallowRender();
                $Body.find("Row").first().trigger("click");
            };
            expect(peacemaker).not.to.throw();
        });

    });

});
