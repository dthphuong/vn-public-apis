/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
var UseCase = require('../core/use_case/loc_districts'),
    utils = require('../utils'),
    config = require('../config'),
    _ = require('underscore'),
    crypto = require('crypto-js'),
    fs = require('fs');


exports.getAll = function (req, res, next) {
    UseCase.getAll(req.myParams, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: [],
                message: utils.ErrorHandle.getErrorMessage(err)
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Get all items successful'
        })
    })
}

exports.getById = function (req, res, next) {
    var loc_districtsId = req.query._id
    UseCase.getById(loc_districtsId, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(err)
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Get item successful'
        })
    })
}

exports.getByProvince = function (req, res, next) {
    var data = req.myParams;
    if (_.isUndefined(data.provinceCode)) {
        data.provinceCode = []
    } else {
        if (data.provinceCode.trim() == '') {
            data.provinceCode = []
        } else {
            data.provinceCode = data.provinceCode.split(",")
        }
    }

    UseCase.getByProvince(data, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: [],
                message: utils.ErrorHandle.getErrorMessage(err)
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Get item successful'
        })
    })
}

// exports.create = function (req, res, next) {
//     var data = req.body;
//     UseCase.create(data, function (err, result) {
//         if (err) {
//             return res.send({
//                 exitcode: utils.ErrorHandle.getErrorCode(err),
//                 data: [],
//                 message: utils.ErrorHandle.getErrorMessage(err)
//             })
//         }
//         return res.send({
//             exitcode: 1,
//             data: {
//                 loc_districtsId: result._id,
//             },
//             message: 'Create item successful',
//         });
//     })
// }

// exports.update = function (req, res, next) {
//     var loc_districts = req.body;
//     UseCase.update(loc_districts, function (err, result) {
//         if (err) {
//             return res.send({
//                 exitcode: utils.ErrorHandle.getErrorCode(err),
//                 data: [],
//                 message: utils.ErrorHandle.getErrorMessage(err)
//             })
//         }
//         return res.send({
//             exitcode: 1,
//             data: {
//                 'nModified': result.nModified
//             },
//             message: 'Update item successful'
//         });
//     })
// }

exports.delete = function (req, res, next) {
    var loc_districtsId = req.query.loc_districtsId;
    UseCase.delete(loc_districtsId, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(err)
            })
        }

        if (result.nModified == 0) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(706),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(706)
            })
        } else {
            return res.send({
                exitcode: 1,
                data: {},
                message: 'Delete item successful'
            });
        }
    })
}