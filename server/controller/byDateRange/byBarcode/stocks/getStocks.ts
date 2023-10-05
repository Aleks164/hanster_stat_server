import { PipelineStage } from "mongoose";
import { getNextDayDate } from "../../../../utils/getNextDayDate";

export default function getStockDataByDateRange(): PipelineStage[] {
    return [
        {
            '$match': {
                '$and': [
                    {
                        'lastChangeDate': {
                            '$gte': new Date('2023-06-01')
                        }
                    }, {
                        'quantity': {
                            '$gt': 0
                        }
                    }
                ]
            }
        }, {
            '$group': {
                '_id': '$barcode',
                'quantityOnStock': {
                    '$push': '$quantity'
                },
                'retail_price': {
                    '$push': '$Price'
                },
                'sale_percent': {
                    '$push': '$Discount'
                },
                'subject_name': {
                    '$first': '$subject'
                },
                'sa_name': {
                    '$first': '$supplierArticle'
                },
                'ts_name': {
                    '$first': '$techSize'
                },
                'daysOnSite': {
                    '$push': '$daysOnSite'
                }
            }
        }
    ]
}