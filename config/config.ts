import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "pooja";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "pooja123";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.sygdhbi.mongodb.net/myFirstDatabase`;
const SERVER_PORT = process.env.SERVER_port
  ? Number(process.env.SERVER_PORT)
  : 1338;
const TOKEN_KEY = "secret123";

//  now export this constants const config() FOR mongoDB connection
export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  token: {
    TOKEN_KEY,
  },
};
