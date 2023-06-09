"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerifiy = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config/config");
const tokenVerifiy = (req, res, next) => {
    //Get the jwt token from the head
    let token = req.headers["authorization"];
    if (!token) {
        res.status(401).send({ message: "Token not provided" });
    }
    token = token.replace("Bearer ", "");
    console.log(token);
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.config.token.TOKEN_KEY);
        res.locals.jwtPayload = jwtPayload;
        console.log(jwtPayload);
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({ message: "Not Authorised...! Invalid Token" });
        return;
    }
    //Call the next middleware or controller
    next();
};
exports.tokenVerifiy = tokenVerifiy;
module.exports;
