import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import * as utils from "utils";

chai.use(sinonChai);

describe("`utils`", () => {

    describe("`stringify` function", () => {

        const stringify = utils.__get__("stringify");

        it("if the argument is a string, returns the argument", () => {
            const ret = stringify("string");
            expect(ret).to.equal("string");
        });

        it("if the argument is a not a string, returns the argument stringified", () => {
            const ret = stringify({a: "b"});
            expect(ret).to.deep.equal(`{"a": "b"}`);
        });

    });

    describe("`fromString` function", () => {

        const fromString = utils.__get__("fromString");
        const stringifySpy = sinon.spy();

        before(() => {
            utils.__Rewire__("stringify", stringifySpy);
        });

        after(() => {
            utils.__ResetDependency__("stringify");
        });

        it("return the correct object from a string", () => {
            const ret = fromString("column name");
            expect(ret).to.deep.equal({
                key: "column name",
                formattedKey: "Column Name",
                valueFormatter: stringifySpy
            });
        });

    });

    describe("`fromObject` function", () => {

        const fromObject = utils.__get__("fromObject");
        const stringifySpy = sinon.spy();

        before(() => {
            utils.__Rewire__("stringify", stringifySpy);
        });

        after(() => {
            utils.__ResetDependency__("stringify");
        });

        it("return the correct object from an object [CASE: key: `key`]", () => {
            const ret = fromObject({key: "column 1"});
            expect(ret).to.deep.equal({
                key: "column 1",
                formattedKey: "Column 1",
                valueFormatter: stringifySpy
            });
        });

        it("return the correct object from an object [CASE: keys: `key` and `formattedKey`]", () => {
            const ret = fromObject({
                key: "column 1",
                formattedKey: "First Column"
            });
            expect(ret).to.deep.equal({
                key: "column 1",
                formattedKey: "First Column",
                valueFormatter: stringifySpy
            });
        });

        it("return the correct object from an object [CASE: keys: `key`, `formattedKey` and `valueFormatter`]", () => {
            const valueFormatterSpy = sinon.spy();
            const ret = fromObject({
                key: "column 1",
                formattedKey: "First Column",
                valueFormatter: valueFormatterSpy
            });
            expect(ret).to.deep.equal({
                key: "column 1",
                formattedKey: "First Column",
                valueFormatter: valueFormatterSpy
            });
        });

    });

    describe("`normalizeColumns` function", () => {

        const fromString = sinon.spy();
        const fromObject = sinon.spy();

        beforeEach(() => {
            utils.__Rewire__("fromString", fromString);
            utils.__Rewire__("fromObject", fromObject);
        });

        afterEach(() => {
            fromString.reset();
            fromObject.reset();
            utils.__ResetDependency__("fromString");
            utils.__ResetDependency__("fromObject");
        });

        it("return an array of object", () => {
            const ret = utils.normalizeColumns(["column1"]);
            expect(ret).to.be.an("array");
        });

        it("call `fromString` if the argument of the array is a string and `fromObject` if it is an object", () => {
            utils.normalizeColumns(["column1", {key: "column2"}, "column3", "column4"]);
            expect(fromString).to.have.been.callCount(3);
            expect(fromObject).to.have.been.callCount(1);
        });

    });

});
