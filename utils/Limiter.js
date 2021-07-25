/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const rateLimit = require("express-rate-limit");

const resMessage = {
    exitcode: 905,
    data: {},
    message: 'Limit exceeded requests, please try again later'
}

exports.generalLimiter = rateLimit({
    windowMs: config.server.limiterMaxTime, // 1 minutes
    max: config.server.limiterMaxRequestNormal, // limit each IP to 100 requests per windowMs
    skipFailedRequests: true, // when set to true, failed requests won't be counted
    message: resMessage,
    onLimitReached: function (req, res, options) {
        console.log(req.rateLimit); // logging count limit
    }
});

exports.mediumLimiter = rateLimit({
    windowMs: config.server.limiterMaxTime, // 1 minutes
    max: config.server.limiterMaxRequestMedium, // limit each IP to 10 requests per windowMs
    skipFailedRequests: true, // when set to true, failed requests won't be counted
    message: resMessage,
    onLimitReached: function (req, res, options) {
        console.log(req.rateLimit); // logging count limit
    }
});

exports.hardLimiter = rateLimit({
    windowMs: config.server.limiterMaxTime, // 1 minutes
    max: config.server.limiterMaxRequestHard, // limit each IP to 10 requests per windowMs
    skipFailedRequests: true, // when set to true, failed requests won't be counted
    message: resMessage,
    onLimitReached: function (req, res, options) {
        console.log(req.rateLimit); // logging count limit
    }
});