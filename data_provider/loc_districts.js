/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
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
                ['$sort', data.sBy, data.sType],
            ])

            console.log(query.getQuery());

            Entity.Loc_districtsEntity.aggregate([{
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
                        let nDistricts = _.size(result.allData)

                        cb(null, {
                            nItems: nDistricts,
                            nPages: Math.floor(nDistricts / data.nLimit) + (nDistricts % data.nLimit != 0),
                            data: result.dataWithLimit
                        })
                    } else {
                        cb(2, null)
                    }
                }
            })
        })
        .catch(err => {
            console.log('loc_districts_DataProvider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (loc_districtsId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.Loc_districtsEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(loc_districtsId),
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
            console.log('loc_districts_dataprovider_getById: ' + err);
            cb(err, null)
        })
}

exports.getByProvince = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {

            var query = new QueryBuilder([
                ['$match', 'isDeleted', false, '$and'],
                ['$match', 'parent_code', data.provinceCode, '$and', '$in'],
                ['$match', data.cols, data.q, '$or'],
                ['$sort', 'name', 'ASC'],
            ])

            console.log(query.getQuery());

            Entity.Loc_districtsEntity.aggregate([{
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
                        let nDistricts = _.size(result.allData)

                        cb(null, {
                            nItems: nDistricts,
                            nPages: Math.floor(nDistricts / data.nLimit) + (nDistricts % data.nLimit != 0),
                            data: result.dataWithLimit
                        })
                    } else {
                        cb(2, null)
                    }
                }
            })
        })
        .catch(err => {
            console.log('loc_districts_dataprovider_getByProvince: ' + err);
            cb(err, null)
        })
}

exports.getByNameOrSlug = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Loc_districtsEntity.aggregate([{
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
            console.log('loc_districts_dataprovider_getByNameOrSlug: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    var dataCreate = utils.IO.getInfoDistricts(data)
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                (callback) => {
                    Entity.Loc_provincesEntity.aggregate([{
                        $match: {
                            code: data.parent_code
                        }
                    }], (err, resultParent) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (!_.isEmpty(resultParent)) {
                                callback(null, resultParent[0])
                            } else {
                                callback(2, null)
                            }
                        }
                    })
                },
                (ParentInfo, callback) => {
                    Entity.Loc_districtsEntity.aggregate([
                        {
                            $project: {
                                code: {
                                    $toInt: '$code'
                                }
                            }
                        }, {
                            $sort: {
                                code: -1
                            }
                        }
                    ], (err, result) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (!_.isEmpty(result)) {
                                callback(null, ParentInfo, result[0].code)
                            } else {
                                callback(2, null)
                            }
                        }
                    })
                },
                (ParentInfo, code, callback) => {
                    var path = dataCreate.name + ", " + ParentInfo.name
                    var path_with_type = dataCreate.name_with_type + ", " + ParentInfo.name_with_type
                    Entity.Loc_districtsEntity.create({
                        "name": dataCreate.name,
                        "type": dataCreate.type,
                        "slug": dataCreate.slug,
                        "name_with_type": dataCreate.name_with_type,
                        "path": path,
                        "path_with_type": path_with_type,
                        "code": String(parseInt(code) + 1),
                        "parent_code": data.parent_code,
                        "createdBy": data._currentUser,
                        "updatedBy": data._currentUser
                    }, (err, resultCreate) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            resultCreate._doc.districtsId = resultCreate._doc._id
                            delete resultCreate._doc._id
                            callback(null, resultCreate)
                        }
                    })
                }
            ], cb)
        })
        .catch(err => {
            console.log('loc_districts_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.update = function (loc_districts, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let loc_districtsId = loc_districts.loc_districtsId;
                    Entity.Loc_districtsEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(loc_districtsId)
                        }
                    }], function (err, data) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (data.length > 0) {
                                loc_districts.name = ((loc_districts.name == '' || loc_districts.name == undefined) ? data[0].name : loc_districts.name);
                                loc_districts.type = ((loc_districts.type == '' || loc_districts.type == undefined) ? data[0].type : loc_districts.type);
                                loc_districts.slug = ((loc_districts.slug == '' || loc_districts.slug == undefined) ? data[0].slug : loc_districts.slug);
                                loc_districts.name_with_type = ((loc_districts.name_with_type == '' || loc_districts.name_with_type == undefined) ? data[0].name_with_type : loc_districts.name_with_type);
                                loc_districts.path = ((loc_districts.path == '' || loc_districts.path == undefined) ? data[0].path : loc_districts.path);
                                loc_districts.path_with_type = ((loc_districts.path_with_type == '' || loc_districts.path_with_type == undefined) ? data[0].path_with_type : loc_districts.path_with_type);
                                loc_districts.code = ((loc_districts.code == '' || loc_districts.code == undefined) ? data[0].code : loc_districts.code);
                                loc_districts.parent_code = ((loc_districts.parent_code == '' || loc_districts.parent_code == undefined) ? data[0].parent_code : loc_districts.parent_code);

                                callback(null, loc_districts)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (loc_districts, callback) {
                    Entity.Loc_districtsEntity.updateOne({
                        _id: loc_districts.loc_districtsId
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
            console.log('loc_districts_dataprovider_update: ' + err);
            cb(err, null)
        })
}

exports.delete = function (loc_districtsId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Loc_districtsEntity.updateOne({
                _id: mongoose.Types.ObjectId(loc_districtsId),
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
            console.log('loc_districts_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.deleteByProvinceIds = function (provinceIds, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Loc_districtsEntity.updateMany({
                parent_code: {
                    $in: provinceIds
                },
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
            console.log('loc_wards_dataprovider_deleteByProvinceIds: ' + err);
            cb(err, null)
        })
}