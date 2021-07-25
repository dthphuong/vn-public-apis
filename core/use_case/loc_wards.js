/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
var DataProvider = require('../../data_provider/loc_wards');

exports.getAll = function (data, cb) {
    DataProvider.getAll(data, cb);
}

exports.getById = function (loc_wardsId, cb) {
    DataProvider.getById(loc_wardsId, cb);
}

exports.getByDistrict = function (data, cb) {
    DataProvider.getByDistrict(data, cb);
}

exports.create = function (loc_wardsData, cb) {
    DataProvider.create(loc_wardsData, cb);
}

exports.update = function (loc_wardsData, cb) {
    DataProvider.update(loc_wardsData, cb);
}

exports.delete = function (loc_wardsId, cb) {
    DataProvider.delete(loc_wardsId, cb);
}