/**
 * Created by lakshmi on 14/02/18.
 */

/**
 * Created by lakshmi on 14/02/18.
 */

"use strict";

const MONGOOSE      =   require("mongoose");
const Schema        =   MONGOOSE.Schema;
const Constants     =   require("../util/constants");
/**
 * user schema creation
 */
const user_Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
        // "required": true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    roles: {
      type: [String],
      enum : [ Constants.DATABASE.USER_ROLES.USER, Constants.DATABASE.USER_ROLES.ADMIN, Constants.DATABASE.USER_ROLES.SUB_ADMIN ],
      default: "USER"
    },
    isActive: {
      type: Number,
      enum: [ Constants.SERVER.ISACTIVE[0].NOT_VERIFIED, Constants.SERVER.ISACTIVE[0].VERIFIED, Constants.SERVER.ISACTIVE[0].DELETED ],
      default: Constants.SERVER.ISACTIVE[0].NOT_VERIFIED
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports =  MONGOOSE.model("User", user_Schema);
