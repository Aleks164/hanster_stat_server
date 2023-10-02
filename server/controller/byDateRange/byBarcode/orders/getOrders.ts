import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getOrdersDataByDateRange(fromDate: string, toDate: string): PipelineStage[] {
    return [
        {
            '$match': {
                'date': {
                    '$gte': new Date(fromDate),
                    '$lte': fromDate === toDate ? getNextDayDate(toDate) : new Date(toDate)
                }
            }
        }, {
            '$group': {
                '_id': '$barcode',
                'ordersCount': {
                    '$count': {}
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ]
}