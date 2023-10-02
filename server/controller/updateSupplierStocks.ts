import express from "express";
import getSupplierStocksFromWB from "../utils/fromWB/getSupplierStocksFromWB";
import SupplierStocks from "../model/SupplierStocks";

const updateSupplierStocks = express.Router();

updateSupplierStocks.get("/", async (req, res, next) => {

    const stocksListFromWB = await getSupplierStocksFromWB();
    try {
        const stocks = await SupplierStocks.create(stocksListFromWB);
        res.status(200).json(stocks);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default updateSupplierStocks;
