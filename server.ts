import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./loggers/logging";
import userRoutes from "./routes/user";
import droneRoutes from "./routes/drone";
import siteRoutes from "./routes/site";
import categoryRoutes from "./routes/category";
import missionRoutes from "./routes/mission";

const router = express();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//now connect to mongoDB
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info(`connected to mongoDB dataBase`);
    StartServer();
  })
  .catch((error) => {
    Logging.error(`Unable to connect to DB`);
    Logging.error(error);
  });

router.listen(config.server.port, () => {
  Logging.info(`server started on port ${config.server.port}`);
});

//  only start if server is connected
const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(`Incoming Method: ${req.method} - URL: ${req.url}`);
    next();
  });

  router.use("/userroute", userRoutes);
  router.use("/droneroute", droneRoutes);
  router.use("/siteroute", siteRoutes);
  router.use("/categoryroute", categoryRoutes);
  router.use("/missionroute", missionRoutes);

  //  Check routers are working or not
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "Routers are working fine" })
  );

  //  Error handling if passed request doesnt matched with anything
  router.use((req, res, next) => {
    const error = new Error("Request not matched - not found");
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });
};
