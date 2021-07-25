/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var mongoose = require("mongoose");
(Schema = mongoose.Schema), (ObjectId = Schema.ObjectId);
const Double = require('@mongoosejs/double');

var SchemaTypes = mongoose.Schema.Types;

// Create a Mongoose Schema
var Loc_districtsSchema = new Schema({
    "name": String,
    "type": String,
    "slug": String,
    "name_with_type": String,
    "path": String,
    "path_with_type": String,
    "code": String,
    "parent_code": String,
    "createdAt": Date,
    "createdBy": ObjectId,
    "isDeleted": Boolean,
    "updatedAt": Date,
    "updatedBy": ObjectId
}, { versionKey: false, collation: { locale: 'vi' } });

// Register the schema
exports.Loc_districtsEntity = mongoose.model("Loc_districtsEntity", Loc_districtsSchema, "loc_districts");