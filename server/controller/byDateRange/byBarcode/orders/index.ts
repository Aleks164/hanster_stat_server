import express from "express";
import SupplierSales from "../../../../model/supplierSales";
import getOrders from "./getOrders";

const ordersByDateRange = express.Router();

ordersByDateRange.get("/", async (req, res, next) => {
    const fromDate = req.query["fromDate"] as string;
    const toDate = req.query["toDate"] as string;
    try {
        if (!(fromDate && toDate)) throw new Error("Wrong date");
        const saleCount = await SupplierSales.aggregate(getOrders(fromDate, toDate)).exec();
        res.status(200).json(saleCount);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default ordersByDateRange;
