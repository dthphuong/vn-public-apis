/**
 * Created by FPO Co.,Ltd - August 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const config = require('../config');
const _ = require('underscore');


class QueryBuilder {
    constructor(query) {
        this.query = query;
        this.finalQuery = []
    }

    getQuery() {
        // [
        //     ['$match', 'col1', 'value', '$and'],
        //     ['$match', 'col1,col2, col3', 'value', '$or'],
        //     ['$sort', 'col1', 'ASC']
        // ]

        var matchQuery = [],
            sortFields = [], sortOrders = [];

        _.each(this.query, (item) => {
            switch (item[0]) {
                case '$match':
                    let colList = item[1].trim().split(','),
                        value = item[2];

                    if (colList.length == 1 && colList[0] == '_id' && value == '') { // reject this condition
                        break;
                    } else {
                        let matchConditions = []

                        if (item[3] == '$or') {
                            matchConditions = _.map(colList, (col) => {
                                let res = {}
                                // switch (item[4]) {
                                //     case '$regex':
                                //         res[col] = { $regex: value, $options: 'i' }
                                //         break;
                                //     default:
                                //         res[col] = value
                                //         break;
                                // }
                                res[col] = { $regex: value, $options: 'i' }
                                return res
                            })

                            matchQuery.push({ $or: matchConditions })
                        } else { // $and
                            matchConditions = _.map(colList, (col) => {
                                let res = {}
                                switch (item[4]) {
                                    case '$regex':
                                        res[col] = { $regex: value, $options: 'i' }
                                        break;
                                    case '$not':
                                        res[col] = { $ne: value }
                                        break;
                                    case '$lte':
                                        res[col] = { $lte: value }
                                        break;
                                    case '$lt':
                                        res[col] = { $lt: value }
                                        break;
                                    case '$gte':
                                        res[col] = { $gte: value }
                                        break;
                                    case '$gt':
                                        res[col] = { $gt: value }
                                        break;
                                    case '$in':
                                        res[col] = { $in: value }
                                        break;
                                    case undefined:
                                    default:
                                        res[col] = value
                                        break;
                                }
                                return res;
                            })

                            matchQuery.push(matchConditions[0])
                        }
                        break;
                    }
                    break;
                case '$sort':
                    sortFields.push(item[1])

                    if (item[2].toUpperCase().trim() == 'ASC') {
                        sortOrders.push(1)
                    } else {
                        sortOrders.push(-1)
                    }
                    break;
            }
        })

        // Process final query again
        if (!_.isEmpty(matchQuery)) {
            this.finalQuery.push({
                $match: { $and: matchQuery }
            })
        }

        if (!_.isEmpty(sortFields)) {
            this.finalQuery.push({
                $sort: _.object(sortFields, sortOrders)
            })
        }

        return this.finalQuery;
    }

    debug() {
        this.getQuery();
        console.log(`[DEBUG]: ${JSON.stringify(this.finalQuery, null, 4)}`);
    }
}

module.exports = QueryBuilder;