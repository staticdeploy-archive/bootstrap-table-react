import "babel-polyfill";
import chai from "chai";
import {jsdom} from "jsdom";
import sinonChai from "sinon-chai";

// Register chai plugins
chai.use(sinonChai);

// Setup fake DOM
global.document = jsdom();
global.window = document.defaultView;

global.navigator = {
    userAgent: "node.js"
};
