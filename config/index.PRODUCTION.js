/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
/**
 * configType = 0 is Development environment
 * configType = 1 is Production environment
 */
var home = require("os").homedir();
var configType = 1;
var path = require('path');

switch (configType) {
    case 0: // Development environment
        exports.ENV = 'DEVELOPMENT'
        exports.LogTemplate = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status : :res[content-length] :response-time[3]ms ":referrer" ":user-agent"'

        exports.server = {
            port: 3000,
            accessTokenSecretKey: 'access-secet-key',
            accessTokenExpiryTime: 10000000, // 1-minute
            refreshTokenSecretKey: 'refresh-secet-key',
            refreshTokenExpiryTime: 2592000, // 1-month
            base_url: 'http://localhost',
            limiterMaxTime: 1 * 60 * 1000,
            limiterMaxRequestNormal: 100,
            limiterMaxRequestMedium: 10,
            limiterMaxRequestHard: 1,
            maxDuration: 10000 // ms
        }
        exports.database = {
            host: 'localhost',
            port: 12345,
            name: 'vn-data',
            username: 'admin',
            password: '***********',
            optional: ''
        }
        exports.CONST = {
            DEFAULT_SEARCH_COLUMN: '_id',
            DEFAULT_SORT_COLUMN: '_id',
            DEFAULT_SORT_TYPE: 'ASC',
            DEFAULT_PAGE_INDEX: 1,
            DEFAULT_PAGE_LIMIT: 10
        }

        break;
    case 1: // Production environment
        exports.ENV = 'PRODUCTION'
        exports.LogTemplate = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status : :res[content-length] :response-time[3]ms ":referrer" ":user-agent"'

        exports.server = {
            port: 5000,
            accessTokenSecretKey: 'access-secet-key',
            accessTokenExpiryTime: 60, // 1-minute
            refreshTokenSecretKey: 'refresh-secet-key',
            refreshTokenExpiryTime: 2592000, // 1-month
            base_url: 'https://fpo.vn',
            limiterMaxTime: 1 * 60 * 1000,
            limiterMaxRequestNormal: 100,
            limiterMaxRequestMedium: 10,
            limiterMaxRequestHard: 1,
            maxDuration: 10000 // ms
        }
        exports.database = {
            host: 'your-host',
            port: 12345,
            name: 'vn-data',
            username: 'admin',
            password: '***********',
            optional: ''
        }
        exports.CONST = {
            DEFAULT_SEARCH_COLUMN: '_id',
            DEFAULT_SORT_COLUMN: '_id',
            DEFAULT_SORT_TYPE: 'ASC',
            DEFAULT_PAGE_INDEX: 1,
            DEFAULT_PAGE_LIMIT: 10
        }
        break;
}