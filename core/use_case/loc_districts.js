/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
const async = require('async');
var DataProvider = require('../../data_provider/loc_districts'),
    WardDataProvider = require('../../data_provider/loc_wards');

exports.getAll = function (data, cb) {
    DataProvider.getAll(data, cb);
}

exports.getById = function (loc_districtsId, cb) {
    DataProvider.getById(loc_districtsId, cb);
}

exports.getByProvince = function (data, cb) {
    DataProvider.getByProvince(data, cb);
}

exports.create = function (loc_districtsData, cb) {
    DataProvider.create(loc_districtsData, cb);
}

exports.update = function (loc_districtsData, cb) {
    DataProvider.update(loc_districtsData, cb);
}

exports.delete = function (loc_districtsId, cb) {
    let nModified = 0

    async.waterfall([
        // Get district info
        (callback) => {
            DataProvider.getById(loc_districtsId, callback)
        },
        // Delete district by districtId
        (districtInfo, callback) => {
            DataProvider.delete(loc_districtsId, (err, result) => {
                if (err) {
                    callback(err, null)
                } else {
                    nModified += result.nModified
                    callback(null, districtInfo)
                }
            });
        },
        // Delete wards by district code
        (districtInfo, callback) => {
            WardDataProvider.deleteByDistrictIds([districtInfo.code], (err, result) => {
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