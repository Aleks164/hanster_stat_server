import SupplierReportDetailByPeriod from "../model/supplierReportDetailByPeriod";
import getSupplierReportDetailByPeriod from "../utils/fromWB/getSupplierReportDetailByPeriod";
import SupplierStocks from "../model/SupplierStocks";
import SupplierOrders from "../model/supplierOrders";
import getSupplierOrdersFromWB from "./fromWB/getSupplierOrdersFromWB";
import getSupplierStocksFromWB from "./fromWB/getSupplierStocksFromWB";

async function regularUpdateMongoDB() {
    try {
        const reportDetail = await getSupplierReportDetailByPeriod();
        await SupplierReportDetailByPeriod.create(reportDetail);
        console.log('SupplierReportDetailByPeriod done')
        const stocks = await getSupplierStocksFromWB();
        await SupplierStocks.create(stocks);
        console.log('SupplierStocks done')
        const orders = await getSupplierOrdersFromWB();
        await SupplierOrders.create(orders);
        console.log('SupplierOrders done')
    } catch (e) {
        console.log("Error while saving data to MongoDB", e);
    }
};

export default regularUpdateMongoDB;