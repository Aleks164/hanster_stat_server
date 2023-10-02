import fetch from "node-fetch";
import "dotenv/config";
import { DetailReportItem } from "../../../commonTypes/api";

async function getSupplierReportDetailByPeriod() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dateAsString = `${year}-${month}-${day}`;
  try {
    const responseJson = await fetch(
      `https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod?dateFrom=2022-01-01&dateTo=${dateAsString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.STATISTICS_API as string,
        },
      }
    );
    const salesListFromWB = (await responseJson.json()) as DetailReportItem[];
    return salesListFromWB;
  } catch (err) {
    console.log(err);
  }
}

export default getSupplierReportDetailByPeriod;
