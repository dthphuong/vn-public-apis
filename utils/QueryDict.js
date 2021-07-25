/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const utils = require('./index')
const mongoose = require('mongoose')

exports.LimitOffset = function (nSkip, nLimit) {
    if (nSkip < 0 || nLimit < 0) {
        return [{
            $skip: 0
        }]
    } else {
        return [{
            $skip: nSkip
        }, {
            $limit: nLimit
        }]
    }
}