import React from "react";
import {identity} from "ramda";
import {expect} from "chai";
import $ from "teaspoon";

import Table from "../src/table";

describe("`Table` component", () => {

    it("renders a table", () => {
        const $Table = $(<Table collection={[]} columns={[]} />).render();
        expect($Table.find("table").length).to.equal(1);
        $Table.unmount();
    });

    it("pass to the rendered table the class `table`", () => {
        const $Table = $(<Table collection={[]} columns={[]} />).render();
        expect($Table.find(".table").length).to.equal(1);
        $Table.unmount();
    });

    it("pass to the rendered table the class in props `className` and the class `table`", () => {
        const $Table = $(<Table className="newClassName" collection={[]} columns={[]} />).render();
        expect($Table.find(".newClassName").length).to.equal(1);
        expect($Table.find(".table").length).to.equal(1);
        $Table.unmount();
    });

    it("pass to the rendered table the class set to true in `tableOptions`", () => {
        const $Table = $(
            <Table
                collection={[]}
                columns={[]}
                tableOptions={{
                    bordered: true,
                    condensed: false,
                    hover: true,
                    responsive: true,
                    striped: false
                }}
            />
        ).render();
        expect($Table.find(".table").length).to.equal(1);
        expect($Table.find(".table-bordered").length).to.equal(1);
        expect($Table.find(".table-condensed").length).to.equal(0);
        expect($Table.find(".table-hover").length).to.equal(1);
        expect($Table.find(".table-responsive").length).to.equal(1);
        expect($Table.find(".table-striped").length).to.equal(0);
    });

    it("call the component `Head`", () => {
        const $Table = $(<Table collection={[]} columns={[]} />).render();
        expect($Table.find("Head").length).to.equal(1);
        $Table.unmount();
    });

    it("call the component `Body`", () => {
        const $Table = $(<Table collection={[]} columns={[]} />).render();
        expect($Table.find("Body").length).to.equal(1);
        $Table.unmount();
    });

    it("pass correct props to component `Head`", () => {
        const $Table = $(
            <Table collection={[]} columns={[]} onRowClick={identity} />
        ).render();
        expect($Table.find("Head").props()).to.deep.equal({columns: []});
        $Table.unmount();
    });

    it("pass correct props to component `Body`", () => {
        const $Table = $(
            <Table collection={[]} columns={[]} onRowClick={identity} />
        ).render();
        expect($Table.find("Body").props()).to.deep.equal({
            collection: [],
            columns: [],
            onRowClick: identity
        });
        $Table.unmount();
    });

});
