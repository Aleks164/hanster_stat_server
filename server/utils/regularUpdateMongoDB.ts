import SupplierReportDetailByPeriod from "../model/supplierReportDetailByPeriod";
import getSupplierReportDetailByPeriod from "../utils/fromWB/getSupplierReportDetailByPeriod";
import SupplierStocks from "../model/SupplierStocks";
import SupplierOrders from "../model/supplierOrders";
import getSupplierOrdersFromWB from "./fromWB/getSupplierOrdersFromWB";
import getSupplierStocksFromWB from "./fromWB/getSupplierStocksFromWB";
import dayjs from "dayjs";

async function regularUpdateMongoDB() {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const monthAsString = month > 9 ? month : `0${month}`;
        const day = currentDate.getDate();
        const dayAsString = day > 9 ? day : `0${day}`;
        const dateAsString = `${year}-${monthAsString}-${dayAsString}`;
        const newDate = new Date(dateAsString);
        const newDateFormatted = dayjs(newDate).format('YYYY-MM-DD');
        console.log(newDateFormatted);

        const reportDetail = await getSupplierReportDetailByPeriod(newDateFormatted);
        // await SupplierReportDetailByPeriod.create(reportDetail);
        await SupplierReportDetailByPeriod.insertMany(reportDetail);
        console.log('SupplierReportDetailByPeriod done')
        const stocks = await getSupplierStocksFromWB(newDateFormatted);
        // await SupplierStocks.create(stocks);
        await SupplierStocks.insertMany(stocks);
        console.log('SupplierStocks done')
        const orders = await getSupplierOrdersFromWB(newDateFormatted);
        // await SupplierOrders.create(orders);
        await SupplierOrders.insertMany(orders);
        console.log('SupplierOrders done')
    } catch (e) {
        console.log("Error while saving data to MongoDB", e);
    }
};

export default regularUpdateMongoDB;