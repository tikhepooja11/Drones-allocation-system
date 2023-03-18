"use strict";
//to define some logs
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class Logging {
}
exports.default = Logging;
_a = Logging;
Logging.log = (args) => _a.info(args);
Logging.info = (args) => console.log(`${new Date().toLocaleString()}, [INFO]: ${args}`);
Logging.warn = (args) => console.log(`${new Date().toLocaleString()}, [INFO]: ${args}`);
Logging.error = (args) => console.log(`${new Date().toLocaleString()}, [INFO]: ${args}`);
