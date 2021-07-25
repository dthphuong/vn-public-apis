/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
const { normalizeUnits } = require('moment');
var mongoose = require('mongoose');
const { result } = require('underscore');
var async = require('async'),
    _ = require('underscore'),
    utils = require('../utils'),
    QueryBuilder = require('../utils').QueryBuilder;

var MongoConnect = require('../utils/MongoConnect'),
    Entity = require('../core/entity');

exports.getAll = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {

            var query = new QueryBuilder([
                ['$match', 'isDeleted', false, '$and'],
                ['$match', data.cols, data.q, '$or'],
                ['$sort', 'name', 'ASC'],
            ])

            console.log(query.getQuery());

            Entity.Loc_provincesEntity.aggregate([{
                $facet: {
                    allData: query.getQuery(),
                    dataWithLimit: query.getQuery().concat(utils.QueryDict.LimitOffset(data.nSkip, data.nLimit))
                }
            }], function (err, result) {
                if (err) {
                    cb(err, null)
                } else {
                    result = result[0]
                    if (!_.isEmpty(result.dataWithLimit)) {
                        let nProvinces = _.size(result.allData)

                        cb(null, {
                            nItems: nProvinces,
                            nPages: Math.floor(nProvinces / data.nLimit) + (nProvinces % data.nLimit != 0),
                            data: result.dataWithLimit
                        })
                    } else {
                        cb(2, null)
                    }
                }
            })
        })
        .catch(err => {
            console.log('loc_provinces_DataProvider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (loc_provincesId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.Loc_provincesEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(loc_provincesId),
                            isDeleted: false
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (!_.isEmpty(result)) {
                                callback(null, result[0])
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                }
            ], cb)
        })
        .catch(err => {
            console.log('loc_provinces_dataprovider_getById: ' + err);
            cb(err, null)
        })
}

exports.getByNameOrSlug = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Loc_provincesEntity.aggregate([{
                $match: {
                    $and: [
                        { isDeleted: false },
                        {
                            $or: [
                                { slug: data.slug },
                                { name: data.name },
                                { name_with_type: data.name }
                            ]
                        }
                    ]
                }
            }], function (err, result) {
                if (err) {
                    cb(err, null)
                } else {
                    if (!_.isEmpty(result)) {
                        cb(null, result[0])
                    } else {
                        cb(3, null)
                    }
                }
            })
        })
        .catch(err => {
            console.log('loc_provinces_dataprovider_getByNameOrSlug: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    var dataCreate = utils.IO.getInfoProvince(data)
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Loc_provincesEntity.aggregate([{
                $project: {
                    code: {
                        $toInt: '$code'
                    }
                }
            }, {
                $sort: {
                    code: -1
                }
            }], (err, result) => {
                if (err) {
                    cb(err, null)
                } else {
                    var codeCreate = parseInt(result[0].code) + 1
                    Entity.Loc_provincesEntity.create({
                        "name": dataCreate.name,
                        "type": dataCreate.type,
                        "slug": dataCreate.slug,
                        "name_with_type": dataCreate.name_with_type,
                        "code": String(codeCreate),
                        "createdBy": data._currentUser,
                        "updatedBy": data._currentUser
                    }, (err, resultCreate) => {
                        if (err) {
                            cb(err, null)
                        } else {
                            resultCreate._doc.provinceId = resultCreate._doc._id
                            delete resultCreate._doc._id
                            cb(null, resultCreate)
                        }
                    })
                }
            })
        })
        .catch(err => {
            console.log('loc_provinces_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.update = function (loc_provinces, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let loc_provincesId = loc_provinces.loc_provincesId;
                    Entity.Loc_provincesEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(loc_provincesId)
                        }
                    }], function (err, data) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (data.length > 0) {
                                loc_provinces.name = ((loc_provinces.name == '' || loc_provinces.name == undefined) ? data[0].name : loc_provinces.name);
                                loc_provinces.type = ((loc_provinces.type == '' || loc_provinces.type == undefined) ? data[0].type : loc_provinces.type);
                                loc_provinces.slug = ((loc_provinces.slug == '' || loc_provinces.slug == undefined) ? data[0].slug : loc_provinces.slug);
                                loc_provinces.name_with_type = ((loc_provinces.name_with_type == '' || loc_provinces.name_with_type == undefined) ? data[0].name_with_type : loc_provinces.name_with_type);
                                loc_provinces.path = ((loc_provinces.path == '' || loc_provinces.path == undefined) ? data[0].path : loc_provinces.path);
                                loc_provinces.path_with_type = ((loc_provinces.path_with_type == '' || loc_provinces.path_with_type == undefined) ? data[0].path_with_type : loc_provinces.path_with_type);
                                loc_provinces.code = ((loc_provinces.code == '' || loc_provinces.code == undefined) ? data[0].code : loc_provinces.code);
                                loc_provinces.parent_code = ((loc_provinces.parent_code == '' || loc_provinces.parent_code == undefined) ? data[0].parent_code : loc_provinces.parent_code);

                                callback(null, loc_provinces)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (loc_provinces, callback) {
                    Entity.Loc_provincesEntity.updateOne({
                        _id: loc_provinces.loc_provincesId
                    }, {
                        $set: {
                            "name": data.name,
                            "type": data.type,
                            "slug": data.slug,
                            "name_with_type": data.name_with_type,
                            "path": data.path,
                            "path_with_type": data.path_with_type,
                            "code": data.code,
                            "parent_code": data.parent_code,
                        }
                    }, function (err, result) {
                        if (!err) {
                            callback(null, result)
                        } else {
                            callback(err, null)
                        }
                    })
                }

            ], cb)
        })
        .catch(err => {
            console.log('loc_provinces_dataprovider_update: ' + err);
            cb(err, null)
        })
}

exports.delete = function (loc_provincesId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Loc_provincesEntity.updateOne({
                _id: mongoose.Types.ObjectId(loc_provincesId),
                createdAt: {
                    $gt: new Date("2020-01-01")
                }
            }, {
                $set: {
                    "isDeleted": true,
                    "updatedAt": new Date()
                }
            }, cb)
        })
        .catch(err => {
            console.log('loc_provinces_dataprovider_delete: ' + err);
            cb(err, null)
        })
}