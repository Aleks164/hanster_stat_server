import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getSaleDataByDateRange(fromDate: string, toDate: string): PipelineStage[] {
    return [
        {
            '$match': {
                'date': {
                    '$gte': new Date(fromDate),
                    '$lte': fromDate === toDate ? getNextDayDate(toDate) : new Date(toDate)
                }
            }
        }, {
            '$project': {
                'gNumber': 1,
                'date': 1,
                'discountPercent': 1,
                'spp': 1,
                'forPay': 1,
                'finishedPrice': 1,
                'priceWithDisc': 1,
                'barcode': 1
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ]
}