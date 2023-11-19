import express from "express";
import getRatingByNmidList from "./getRatingByNmidList";
import SupplierReportDetailByPeriod from "../../../../model/supplierReportDetailByPeriod";
import getRatingFromWB, { Rating } from "../../../../utils/fromWB/getRatingFromWB";
import SupplierRating from "../../../../model/supplierRating";

const ratingByNmid = express.Router();

ratingByNmid.get("/", async (req, res, next) => {
    const nmidAsString = req.query["nmid"] as string;
    try {
        if (!(nmidAsString)) throw new Error("Wrong nmid");
        const nmidList = nmidAsString.split(",");
        const ratingListFromDB: Rating[] = await SupplierRating.aggregate(getRatingByNmidList(nmidList)).exec();
        const missingItems = nmidList.filter(el => !ratingListFromDB.find(rating => rating));
        const list = (await Promise.all([...missingItems.map(el => getRatingFromWB(el))])).filter(el => el);
        console.log(nmidAsString, ratingListFromDB, list)
        await SupplierRating.insertMany(list);

        res.set('Cache-control', 'public, max-age=3000');
        res.status(200).json([...ratingListFromDB, ...list]);
    } catch (e: any) {
        res.status(400).json(e.message);
    }
});

export default ratingByNmid;
