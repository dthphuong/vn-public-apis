/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
const async = require('async');
var DataProvider = require('../../data_provider/loc_provinces');
var LocDistrictsDataProvider = require('../../data_provider/loc_districts');
var LocWardsDataProvider = require('../../data_provider/loc_wards');

exports.getAll = function (data, cb) {
    DataProvider.getAll(data, cb);
}

exports.getById = function (loc_provincesId, cb) {
    DataProvider.getById(loc_provincesId, cb);
}

exports.create = function (data, cb) {
    if (data.parent_code == "" || data.parent_code == undefined || data.parent_code == null) {
        switch (data.type) {
            // case "thanh-pho":
            case "quan":
            case "thi-xa":
            case "huyen":
            case "phuong":
            case "thi-tran":
            case "xa":
                cb(708, null)
                break;
            default:
                DataProvider.create(data, cb)
                break;
        }
    } else {
        switch (data.type) {
            case "thanh-pho":
            case "quan":
            case "thi-xa":
            case "huyen":
                LocDistrictsDataProvider.create(data, cb)
                break;
            case "phuong":
            case "thi-tran":
            case "xa":
                LocWardsDataProvider.create(data, cb)
                break;
        }
    }
}

exports.update = function (loc_provincesData, cb) {
    DataProvider.update(loc_provincesData, cb);
}

exports.delete = function (params, cb) {
    let nModified = 0

    async.waterfall([
        // Get province info
        (callback) => {
            DataProvider.getById(params.loc_provincesId, callback)
        },
        // Delete province by provinceId
        (provinceInfo, callback) => {
            DataProvider.delete(params.loc_provincesId, (err, result) => {
                if (err) {
                    callback(err, null)
                } else {
                    nModified += result.nModified
                    callback(null, provinceInfo)
                }
            });
        },
        // Delete district by province code
        (provinceInfo, callback) => {
            params.nLimit = -1
            LocDistrictsDataProvider.getByProvince({ ...params, ...{ provinceCode: [provinceInfo.code] } }, (err, districts) => {
                if (err) {
                    if (err == 2) {
                        callback(null, [])
                    } else {
                        callback(err, null);
                    }
                } else {
                    LocDistrictsDataProvider.deleteByProvinceIds([provinceInfo.code], (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            nModified += result.nModified
                            callback(null, _.map(districts.data, (item) => { return item.code }));
                        }
                    })
                }
            })
        },
        // Delete wards by district code
        (districtCodes, callback) => {
            LocWardsDataProvider.deleteByDistrictIds(districtCodes, (err, result) => {
                if (err) {
                    callback(err, null)
                } else {
                    nModified += result.nModified
                    callback(null, result)
                }
            })
        }
    ], (error, result) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, { nModified: nModified })
        }
    })
}