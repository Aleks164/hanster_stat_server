import express from "express";
import cors from "cors";
import connectToDB from "./utils/connectToDB";
import updateSupplierStocks from "./controller/updateSupplierStocks";
import updateSupplierOrders from "./controller/updateSupplierOrders";
import updateSupplierSales from "./controller/updateSupplierSales";
import updateSupplierReportDetailByPeriod from "./controller/updateSupplierReportDetailByPeriod";
import ordersByDateRange from "./controller/byDateRange/byBarcode/orders";
import reportDetailsByDateRange from "./controller/byDateRange/byBarcode/reportDetails";
import stocksByDateRange from "./controller/byDateRange/byBarcode/stocks";
import { CronJob } from "cron";
import regularUpdateMongoDB from "./utils/regularUpdateMongoDB";
import https from 'https';
import fs from 'fs';
import path from "path";

const app = express();
const port = 3000;
const key = fs.readFileSync(path.resolve(__dirname, '../selfsigned.key'));
const cert = fs.readFileSync(path.resolve(__dirname, '../selfsigned.crt'));
const options = {
  key: key,
  cert: cert
};

app.use(cors());
app.use("/orders", ordersByDateRange);
app.use("/stocks", stocksByDateRange);
app.use("/reports", reportDetailsByDateRange);

// app.use("/supplier_stocks", updateSupplierStocks);
// app.use("/supplier_orders", updateSupplierOrders);
// app.use("/supplier_sales", updateSupplierSales);
// app.use("/supplier_reportDetailByPeriod", updateSupplierReportDetailByPeriod);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).send("Sorry, cant find that");
});

// const job = new CronJob('01 15 15 * * *', async function () {
//   console.log('Midnight1:', new Date());
//   await regularUpdateMongoDB();
//   console.log('Midnight2:', new Date());
// });


// job.start();

const server = https.createServer(options, app);

server.listen(port, async () => {
  await connectToDB();
  console.log(`Listening on port ${port}`);
});


