import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";

import Body from "../src/Body";
import Head from "../src/Head";
import Table from "../src/Table";

describe("Table", () => {

    it("renders a table", () => {
        const table = shallow(
            <Table collection={[]} columns={[]} />
        );
        expect(
            table.find("table")
        ).to.have.length(1);
    });

    describe("renders a table that", () => {

        it("has css class table", () => {
            const table = shallow(
                <Table collection={[]} columns={[]} />
            );
            expect(
                table.find("table").hasClass("table")
            ).to.equal(true);
        });

        it("inherits css classes passed to the Table component", () => {
            const table = shallow(
                <Table className="class1 class2" collection={[]} columns={[]} />
            );
            expect(
                table.find("table").hasClass("class1")
            ).to.equal(true);
            expect(
                table.find("table").hasClass("class2")
            ).to.equal(true);
        });

        it("has css classes corresponding to the enabled tableOptions", () => {
            const optionNames = [
                "bordered",
                "condensed",
                "hover",
                "responsive",
                "striped"
            ];
            optionNames.forEach(optionName => {
                const tableOptions = {[optionName]: true};
                const table = shallow(
                    <Table
                        collection={[]}
                        columns={[]}
                        tableOptions={tableOptions}
                    />
                );
                expect(
                    table.find("table").hasClass(`table-${optionName}`)
                ).to.equal(true);
            });
        });

    });

    it("renders a Head", () => {
        const table = shallow(
            <Table collection={[]} columns={[]} />
        );
        expect(
            table.find(Head)
        ).to.have.length(1);
    });

    it("renders a Body", () => {
        const table = shallow(
            <Table collection={[]} columns={[]} />
        );
        expect(
            table.find(Body)
        ).to.have.length(1);
    });

});
