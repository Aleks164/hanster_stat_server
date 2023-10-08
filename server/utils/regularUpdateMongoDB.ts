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
        const nextDay = currentDate.getDate() + 1;
        const nextDayAsString = nextDay > 9 ? nextDay : `0${nextDay}`;
        const nextDayDateAsString = `${year}-${monthAsString}-${nextDayAsString}`;
        const nextDayDate = new Date(nextDayDateAsString);
        const nextDateFormatted = dayjs(nextDayDate).format('YYYY-MM-DD');
        const dayAtLastWeekFormatted = dayjs(currentDate).subtract(7, 'day').format('YYYY-MM-DD');
        console.log("dayAtLastWeekFormatted", dayAtLastWeekFormatted);
        console.log("nextDateFormatted", nextDateFormatted);

        const reportDetail = await getSupplierReportDetailByPeriod(dayAtLastWeekFormatted, nextDateFormatted);
        // await SupplierReportDetailByPeriod.create(reportDetail);
        await SupplierReportDetailByPeriod.insertMany(reportDetail);
        console.log('SupplierReportDetailByPeriod done', reportDetail)
        const stocks = await getSupplierStocksFromWB(dayAtLastWeekFormatted);
        // // await SupplierStocks.create(stocks);
        await SupplierStocks.insertMany(stocks);
        console.log('SupplierStocks done')
        const orders = await getSupplierOrdersFromWB(dayAtLastWeekFormatted);
        // // await SupplierOrders.create(orders);
        await SupplierOrders.insertMany(orders);
        console.log('SupplierOrders done')
    } catch (e) {
        console.log("Error while saving data to MongoDB", e);
    }
};

export default regularUpdateMongoDB;