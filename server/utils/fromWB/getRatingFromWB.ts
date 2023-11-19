import fetch from "node-fetch";
import "dotenv/config";

export interface Rating {
  "valuation": string,
  "feedbacksCount": number,
  "nmId": number
}

async function getRatingFromWB(nmid: string) {
  try {
    const responseJson = await fetch(
      `https://feedbacks-api.wildberries.ru/api/v1/feedbacks/products/rating/nmid?nmid=${nmid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.STANDARD_API as string,
        },
      }
    );
    const salesListFromWB = (await responseJson.json()) as Rating;
    salesListFromWB.nmId = +nmid;
    return salesListFromWB;
  } catch (err) {
    console.log(err);
  }
}

export default getRatingFromWB;
