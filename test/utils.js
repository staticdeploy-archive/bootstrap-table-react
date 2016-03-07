import {expect} from "chai";

import {normalizeColumns} from "../src/utils";

describe("utils", () => {

    describe("normalizeColumns", () => {

        it("normalises columns", () => {
            const columns = normalizeColumns(["column1", {key: "column2"}]);
            expect(columns[0]).to.have.property("key", "column1");
            expect(columns[0]).to.have.property("formattedKey", "Column 1");
            expect(columns[0].valueFormatter).to.be.a("function");
            expect(columns[1]).to.have.property("key", "column2");
            expect(columns[1]).to.have.property("formattedKey", "Column 2");
            expect(columns[0].valueFormatter).to.be.a("function");
        });

    });

});
