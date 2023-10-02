import express from "express";
import SupplierStocks from "../../../../model/SupplierStocks";
import getStocks from "./getStocks";

const stocksByDateRange = express.Router();

stocksByDateRange.get("/", async (req, res, next) => {
    const fromDate = req.query["fromDate"] as string;
    const toDate = req.query["toDate"] as string;
    try {
        if (!(fromDate && toDate)) throw new Error("Wrong date");
        const saleCount = await SupplierStocks.aggregate(getStocks(fromDate, toDate)).exec();
        res.status(200).json(saleCount);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default stocksByDateRange;
