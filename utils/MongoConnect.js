/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

var mongoose = require('mongoose');
global.config = require('../config');

var db;

exports.Connect = function (dbName) {
    return new Promise(function (resolve, reject) {
        if (db) {
            if (db.name == dbName) {
                resolve(db);
                return;
            } else {
                console.log('Close database [' + db.name + ']');
                db.close();
            }
        }
        mongoose.Promise = global.Promise;

        // create connection string
        var connectionString = '';
        if (config.database.username == '' || config.database.password == '') {
            connectionString = 'mongodb://' + config.database.host + ':' + config.database.port + "/" + dbName + config.database.optional;
        } else {
            connectionString = 'mongodb://' + config.database.username + ':' + config.database.password + '@' +
                config.database.host + ':' + config.database.port + "/" + dbName + config.database.optional;
        }

        // connect to database
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                db = mongoose.connection;
                console.log('MongoDb connection created to [' + db.name + ']');
                resolve(db);
            })
            .catch(err => {
                console.log('Error creating MongoDb connection: ' + err);
                reject(err);
            });
    });
};