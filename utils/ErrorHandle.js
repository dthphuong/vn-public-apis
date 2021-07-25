/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

var _ = require('underscore')
var errorTable = [{
    'code': 0,
    'message': 'Unexpected error'
},
{
    'code': 2,
    'message': 'No data returned'
},
{
    'code': 3,
    'message': '_id is not existed'
},
{
    'code': 4,
    'message': 'Username and Email do not match'
},
{
    'code': 5,
    'message': 'Your turn(s) are over'
},
{
    'code': 900,
    'message': 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
},
{
    'code': 901,
    'message': 'JWT expired'
},
{
    'code': 902,
    'message': 'Access denied'
},
{
    'code': 903,
    'message': 'JWT is not correct'
},
{
    'code': 904,
    'message': 'JWT is not active'
},
{
    'code': 905,
    'message': 'Limit exceeded requests, please try again later'
},
{
    'code': 101,
    'message': 'Username is existed'
},
{
    'code': 102,
    'message': 'User\'s device is existed'
},
{
    'code': 103,
    'message': 'Missed some requirement informations'
},
{
    'code': 104,
    'message': 'Wrong username/Username'
},
]

exports.getErrorCode = function (error) {
    let errorCode = 0,
        res = null

    if (_.isObject(error)) {
        res = _.filter(errorTable, (item) => {
            return item.message == error.message
        })
    } else {
        errorCode = error
        res = _.filter(errorTable, (item) => {
            return item.code == errorCode
        })
    }

    try {
        if (res.length > 0) {
            return res[0].code
        } else {
            return 0;
        }
    } catch (ex) {
        return 0;
    }
}

exports.getErrorMessage = function (error) {
    let errorCode = 0,
        res = null

    if (_.isObject(error)) {
        res = _.filter(errorTable, (item) => {
            return item.message == error.message
        })
    } else {
        errorCode = error
        res = _.filter(errorTable, (item) => {
            return item.code == errorCode
        })
    }

    try {
        if (res.length > 0) {
            return res[0].message
        } else {
            return 'Unexpected error'
        }
    } catch (ex) {
        return 'Unexpected error'
    }

}