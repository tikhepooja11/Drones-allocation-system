"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const user_1 = __importDefault(require("./routes/user"));
const drone_1 = __importDefault(require("./routes/drone"));
const site_1 = __importDefault(require("./routes/site"));
const category_1 = __importDefault(require("./routes/category"));
const mission_1 = __importDefault(require("./routes/mission"));
const router = (0, express_1.default)();
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.json());
//now connect to mongoDB
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    logging_1.default.info(`connected to mongoDB dataBase`);
    StartServer();
})
    .catch((error) => {
    logging_1.default.error(`Unable to connect to DB`);
    logging_1.default.error(error);
});
router.listen(config_1.config.server.port, () => {
    logging_1.default.info(`server started on port ${config_1.config.server.port}`);
});
/*only start if server is connected*/
const StartServer = () => {
    router.use((req, res, next) => {
        logging_1.default.info(`Incoming Method: ${req.method} - URL: ${req.url}`);
        next();
    });
    router.use("/userroute", user_1.default);
    router.use("/droneroute", drone_1.default);
    router.use("/siteroute", site_1.default);
    router.use("/categoryroute", category_1.default);
    router.use("/missionroute", mission_1.default);
    //Routes healthcheak
    router.get("/ping", (req, res, next) => res.status(200).json({ message: "Routers are working fine" }));
    //error handling if passed request doesnt matched with anything
    router.use((req, res, next) => {
        const error = new Error("Request not matched - not found");
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
};
