import express from "express";
import SupplierOrders from "../model/supplierOrders";
import getSupplierOrdersFromWB from "../utils/fromWB/getSupplierOrdersFromWB";

const updateSupplierOrders = express.Router();

updateSupplierOrders.get("/", async (req, res, next) => {

    const orders = await getSupplierOrdersFromWB();
    try {
        const ordersFromWB = await SupplierOrders.create(orders);
        res.status(200).json(ordersFromWB);
    } catch (e) {
        res.status(400).json("Bad request");
    }
});

export default updateSupplierOrders;
