import fetch from "node-fetch";
import "dotenv/config";
import { DetailReportItem } from "../../../commonTypes/api";

async function getSupplierReportDetailByPeriod(date: string, dayAtLastWeek: string) {
  try {
    const responseJson = await fetch(
      `https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod?dateFrom=${dayAtLastWeek}&dateTo=${date}`,
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
