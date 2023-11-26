import express from "express";
import cors from "cors";
import connectToDB from "./utils/connectToDB";
import ordersByDateRange from "./controller/byDateRange/byBarcode/orders";
import reportDetailsByDateRange from "./controller/byDateRange/byBarcode/reportDetails";
import stocksByDateRange from "./controller/byDateRange/byBarcode/stocks";
import { CronJob } from "cron";
import regularUpdateMongoDB from "./utils/regularUpdateMongoDB";
import https from 'https';
import fs from 'fs';
import productListByDateRange from "./controller/byDateRange/byBarcode/productList";
import salesByDateRange from "./controller/byDateRange/byBarcode/sales";
import ratingByNmid from "./controller/byDateRange/byBarcode/rating";

const app = express();
const port = 443;
const key = fs.readFileSync('/etc/letsencrypt/live/hansterstatserver.ru/privkey.pem');
const cert = fs.readFileSync('/etc/letsencrypt/live/hansterstatserver.ru/fullchain.pem');
const options = {
  key: key,
  cert: cert
};

app.use(cors());
app.use("/orders", ordersByDateRange);
app.use("/stocks", stocksByDateRange);
app.use("/sales", salesByDateRange);
app.use("/reports", reportDetailsByDateRange);
app.use("/rating", ratingByNmid);
app.use("/products_list", productListByDateRange);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).send("Sorry, cant find that");
});

const job = new CronJob('0 55 6 * * *', async function () {
  console.log('CronJobStart:', new Date());
  await regularUpdateMongoDB();
  console.log('CronJobEnded:', new Date());
});


job.start();

const server = https.createServer(options, app);

server.listen(port, async () => {
  await connectToDB();
  console.log(`Listening on port ${port}`);
});


