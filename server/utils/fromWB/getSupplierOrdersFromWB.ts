import fetch from "node-fetch";
import "dotenv/config";
import { SalesItem } from "../../../commonTypes/api";

async function getSupplierOrdersFromWB() {

  try {
    const responseJson = await fetch(
      `https://statistics-api.wildberries.ru/api/v1/supplier/orders?dateFrom=2022-01-01`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.STATISTICS_API as string,
        },
      }
    );
    const salesListFromWB = (await responseJson.json()) as SalesItem[];
    return salesListFromWB;
  } catch (err) {
    console.log(err);
  }
}

export default getSupplierOrdersFromWB;
