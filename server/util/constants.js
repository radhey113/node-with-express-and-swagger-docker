/**
 * app constants
 */

let SERVER = {
    APP_NAME: 'demo',
    TOKEN_EXPIRATION_IN_MINUTES: 600,
    JWT_SECRET_KEY: 'demo_application_JWT_SECRET_KEY',
    GOOGLE_API_KEY : '',
    COUNTRY_CODE : '+91',
    MAX_DISTANCE_RADIUS_TO_SEARCH : '1',
    THUMB_WIDTH : 300,
    THUMB_HEIGHT : 300,
    DOMAIN_NAME : 'http://localhost:8000/',
    SUPPORT_EMAIL : 'demo@support.com',
    COMPARECRONTIME: '15',
    GETTINGDATACRONTIME: '50',
    VERIFICATION_END_POINT: "http://localhost:4000/auth/userverification/",
    PRIVILEGES: ["READ", "WRITE"],
    ISBOOKED: ["BOOKED","EXPIRED"],
    ISACTIVE: [
        { NOT_VERIFIED: 0 },
        { VERIFIED: 1},
        { DELETED: 2 }
    ]
  };
  
  let DATABASE = {
    ZONES:{
        NORTH:'NORTH',
        SOUTH:'SOUTH',
        BOTH:'BOTH'
    },
    STATUS : {
        OPEN:'OPEN',
        PENDING : 'PENDING',
        ACCEPT : 'ACCEPT',
        REJECT:'REJECT',
        APPROVED:'APPROVED',
        CLOSE:'CLOSE',
        DELETED:'DELETED'
  
    },
    LEAD_TYPE:{
      FULL:'FULL',
        QUICK:'QUICK'
    },
  
    PROFILE_PIC_PREFIX : {
        ORIGINAL : 'profilePic_',
        THUMB : 'profileThumb_'
    },
  
    LOGO_PREFIX : {
        ORIGINAL : 'logo_',
        THUMB : 'logoThumb_'
    },
  
    DOCUMENT_PREFIX : 'document_',
  
    USER_ROLES: {
        ADMIN: 'ADMIN',
        USER: 'USER',
        SUB_ADMIN: "SUBADMIN"
    },
  
   
    DEVICE_TYPES: {
        IOS: 'IOS',
        ANDROID: 'ANDROID'
    },

    STATUS_TYPES:{
        USERRATE:'USERRATE'
    },
  
    GENDER:{
        MALE:'MALE',
        FEMALE:'FEMALE'
    },

    LANGUAGE: {
        EN: 'EN',
        ES_MX: 'ES_MX'
    },
    
    PAYMENT_OPTIONS : {
        CREDIT_DEBIT_CARD : 'CREDIT_DEBIT_CARD',
        PAYPAL : 'PAYPAL',
        BITCOIN : 'BITCOIN',
        GOOGLE_WALLET : 'GOOGLE_WALLET',
        APPLE_PAY : 'APPLE_PAY',
        EIYA_CASH : 'EIYA_CASH'
    },
  
    ALERT_TYPE : {
        HOUR_24 : 0,
        PRICE_TYPE: 1
    },

    ORDER_STATUS: ["Pending", "Delivered"]
  };
  
  let STATUS_MSG = {
    ERROR: {

        CUSTOME_ERR_MESSAGE: (message, statusCode) => {
            return {
                statusCode:statusCode,
                type: 'DEFAULT',
                message : message
            }
        },

        ADMIN_ERROR:{
            statusCode:400,
            type: 'ADMIN',
            message : 'Not a admin'
        },
        CUSTOME_ERROR:{
            statusCode:404,
            type: 'DELETED_USER',
            customMessage : ' is required !'
        },
        DELETED_USER:{
            statusCode:400,
            type: 'DELETED_USER',
            customMessage : 'You are no more Sales Excecutive register again !'
        },
        ASSIGN_PENDING: {
            statusCode:400,
            type: 'ASSIGN_PENDING',
            customMessage : 'You are not authorized to create the Sales Excecutive!'
        },
        CAN_NOT_DELETE:{
            statusCode:400,
            type: 'CAN_NOT_DELETE',
            customMessage : 'Plz reallocate all lead to another Sales Executive first!'
        },
        PENDING_CONFIRM: {
            statusCode:400,
            type: 'PENDING_CONFIRM',
            customMessage : 'Pending Request Not Confirmed by SalesExcecutive '
        },
        ALREADY_EXIST: {
            statusCode:400,
            type: 'ALREADY_EXIST',
            customMessage : 'EmployeeCode Already Exist '
        },
  
        APPROVAL_PENDING: {
            statusCode:400,
            type: 'APPROVAL_PENDING',
            customMessage : 'Your approval is pending '
        },
        PRODUCT_ALREADY_EXIST: {
            statusCode:400,
            type: 'PRODUCT_ALREADY_EXIST',
            customMessage : 'Product Already Exist '
        },
  
        DATA_NOT_FOUND: {
            statusCode:400,
            customMessage : 'No data Found',
            type: 'DATA_NOT_FOUND',
        },
        INVALID_USER_PASS: {
            statusCode:400,
            type: 'INVALID_USER_PASS',
            customMessage : 'Invalid username or password'
        },
        INVALID_USERNAME: {
            statusCode:400,
            type: 'INVALID_USER_NAME',
            customMessage : 'Invalid Email'
        },
        INVALID_PASSWORD: {
            statusCode:400,
            type: 'INVALID_PASS',
            customMessage : 'Invalid password.'
        },
        TOKEN_ALREADY_EXPIRED: {
            statusCode:401,
            customMessage : 'Token Already Expired',
            type : 'TOKEN_ALREADY_EXPIRED'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        INVALID_ID: {
            statusCode:400,
            customMessage : 'Invalid Id Provided : ',
            type : 'INVALID_ID'
        },
        APP_ERROR: {
            statusCode:400,
            customMessage : 'Application Error',
            type : 'APP_ERROR'
        },
        ADDRESS_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Address not found',
            type : 'ADDRESS_NOT_FOUND'
        },
        SAME_ADDRESS_ID: {
            statusCode:400,
            customMessage : 'Pickup and Delivery Address Cannot Be Same',
            type : 'SAME_ADDRESS_ID'
        },
        PICKUP_ADDRESS_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Pickup Address not found',
            type : 'PICKUP_ADDRESS_NOT_FOUND'
        },
        DELIVERY_ADDRESS_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Delivery Address not found',
            type : 'DELIVERY_ADDRESS_NOT_FOUND'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation Error',
            type : 'IMP_ERROR'
        },
        APP_VERSION_ERROR: {
            statusCode:400,
            customMessage : 'One of the latest version or updated version value must be present',
            type : 'APP_VERSION_ERROR'
        },
        INVALID_TOKEN: {
            statusCode:401,
            customMessage : 'Invalid token provided',
            type : 'INVALID_TOKEN'
        },
        INVALID_CODE: {
            statusCode:400,
            customMessage : 'Invalid Verification Code',
            type : 'INVALID_CODE'
        },
        DEFAULT: {
            statusCode:400,
            customMessage : 'Error',
            type : 'DEFAULT'
        },
        PHONE_NO_EXIST: {
            statusCode:400,
            customMessage : 'Phone No Already Exist',
            type : 'PHONE_NO_EXIST'
        },
        SKU_EXIST: {
            statusCode:400,
            customMessage : 'SKU No Already Exist',
            type : 'SKU_EXIST'
        },
        ORDER_EXIST: {
            statusCode:400,
            customMessage : 'Order No Already Exist',
            type : 'ORDER_EXIST'
        },
        EMAIL_EXIST: {
            statusCode:400,
            customMessage : 'Email Already Exist',
            type : 'EMAIL_EXIST'
        },
  
        EMAIL_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Email not found',
            type : 'EMAIL_NOT_FOUND'
        },
        DUPLICATE: {
            statusCode:400,
            customMessage : 'Duplicate Entry',
            type : 'DUPLICATE'
        },
        DUPLICATE_ADDRESS: {
            statusCode:400,
            customMessage : 'Address Already Exist',
            type : 'DUPLICATE_ADDRESS'
        },
        UNIQUE_CODE_LIMIT_REACHED: {
            statusCode:400,
            customMessage : 'Cannot Generate Unique Code, All combinations are used',
            type : 'UNIQUE_CODE_LIMIT_REACHED'
        },
        INVALID_REFERRAL_CODE: {
            statusCode:400,
            customMessage : 'Invalid Referral Code',
            type : 'INVALID_REFERRAL_CODE'
        },
        FACEBOOK_ID_PASSWORD_ERROR: {
            statusCode:400,
            customMessage : 'Only one field should be filled at a time, either facebookId or password',
            type : 'FACEBOOK_ID_PASSWORD_ERROR'
        },
        INVALID_EMAIL: {
            statusCode:400,
            message : 'Invalid Email Address',
            type : 'INVALID_EMAIL'
        },
        PASSWORD_REQUIRED: {
            statusCode:400,
            customMessage : 'Password is required',
            type : 'PASSWORD_REQUIRED'
        },
        EMAIL_REQUIRED: {
            statusCode:400,
            customMessage : 'Email is required.',
            type : 'EMAIL_REQUIRED'
        },
        USERNAME_REQUIRED :{
            statusCode: 400,
            customMessage:'Username is required.',
            type: 'USERNAME_REQUIRED'
        },
        INVALID_COUNTRY_CODE: {
            statusCode:400,
            customMessage : 'Invalid Country Code, Should be in the format +52',
            type : 'INVALID_COUNTRY_CODE'
        },
        INVALID_OTP_CODE: {
            statusCode:400,
            message : 'Invalid OTP Code',
            type : 'INVALID_OTP_CODE'
        },
        INVALID_PHONE_NO_FORMAT: {
            statusCode:400,
            customMessage : 'Phone no. cannot start with 0',
            type : 'INVALID_PHONE_NO_FORMAT'
        },
        COUNTRY_CODE_MISSING: {
            statusCode:400,
            customMessage : 'You forgot to enter the country code',
            type : 'COUNTRY_CODE_MISSING'
        },
        INVALID_PHONE_NO: {
            statusCode:400,
            customMessage : 'Phone No. & Country Code does not match to which the OTP was sent',
            type : 'INVALID_PHONE_NO'
        },
        PHONE_NO_MISSING: {
            statusCode:400,
            customMessage : 'You forgot to enter the phone no.',
            type : 'PHONE_NO_MISSING'
        },
        NOTHING_TO_UPDATE: {
            statusCode:400,
            customMessage : 'Nothing to update',
            type : 'NOTHING_TO_UPDATE'
        },
        NOT_FOUND: {
            statusCode:400,
            customMessage : 'Data Not Found',
            type : 'NOT_FOUND'
        },
        INVALID_RESET_PASSWORD_TOKEN: {
            statusCode:400,
            customMessage : 'Invalid Reset Password Token',
            type : 'INVALID_RESET_PASSWORD_TOKEN'
        },
  
        INCORRECT_PASSWORD: {
            statusCode:400,
            customMessage : 'Incorrect Password',
            type : 'INCORRECT_PASSWORD'
        },
        INCORRECT_FILE: {
            statusCode:400,
            customMessage : 'Incorrect File',
            type : 'INCORRECT_FILE'
        },
        INCORRECT_OLD_PASSWORD: {
            statusCode:400,
            customMessage : 'Incorrect old password',
            type : 'INCORRECT_OLD_PASSWORD'
        },
        EMPTY_VALUE: {
            statusCode:400,
            customMessage : 'Empty String Not Allowed',
            type : 'EMPTY_VALUE'
        },
        PHONE_NOT_MATCH: {
            statusCode:400,
            customMessage : "Phone No. Doesn't Match",
            type : 'PHONE_NOT_MATCH'
        },
        SAME_PASSWORD: {
            statusCode:400,
            customMessage : 'Old password and new password are same',
            type : 'SAME_PASSWORD'
        },
        ACTIVE_PREVIOUS_SESSIONS: {
            statusCode:400,
            customMessage : 'You already have previous active sessions, confirm for flush',
            type : 'ACTIVE_PREVIOUS_SESSIONS'
        },
        EMAIL_ALREADY_EXIST: {
            statusCode:400,
            customMessage : 'Email Address Already Exists',
            type : 'EMAIL_ALREADY_EXIST'
        },
        ERROR_PROFILE_PIC_UPLOAD: {
            statusCode:400,
            customMessage : 'Profile pic is not a valid file',
            type : 'ERROR_PROFILE_PIC_UPLOAD'
        },
        PHONE_ALREADY_EXIST: {
            statusCode:400,
            customMessage : 'Phone No. Already Exists',
            type : 'PHONE_ALREADY_EXIST'
        },
        EMPLOYEECODE_NOT_FOUND: {
            statusCode:400,
            customMessage : 'EmployeeCode Not Found',
            type : 'EMPLOYEECODE_NOT_FOUND'
        },
        BLOCK_USER: {
            statusCode:401,
            customMessage : 'You are blocked by Admin',
            type : 'BLOCK_USER'
        },
        FACEBOOK_ID_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Facebook Id Not Found',
            type : 'FACEBOOK_ID_NOT_FOUND'
        },
        PHONE_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Phone No. Not Found',
            type : 'PHONE_NOT_FOUND'
        },
        RECORD_NOT_FOUND: {
            statusCode:400,
            customMessage : 'No More Records Found',
            type : 'RECORD_NOT_FOUND'
        },
        INCORRECT_OLD_PASS: {
            statusCode:400,
            customMessage : 'Incorrect Old Password',
            type : 'INCORRECT_OLD_PASS'
        },
        UNAUTHORIZED: {
            statusCode:401,
            customMessage : 'You are not authorized to perform this action',
            type : 'UNAUTHORIZED'
        },
        NOT_VERIFIED: {
            statusCode:401,
            customMessage : 'You are not verify your email',
            type : 'NOT_VERIFIED'
        },
        ALERT_EXCEED: {
          statusCode:200,
          customMessage : 'You have already saved 10 alerts',
          type : 'ALERT_EXCEED'
       },
        SOMETHING_WRONG: {
            statusCode:500,
            customMessage : 'Something went wrong',
            type : 'WENT_WRONG'
        },
    },
    SUCCESS: {
        CREATED: {
            statusCode:200,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        },
        OTP_SUCCESS: {
            statusCode:200,
            customMessage : 'OTP has been successfully send',
            type : 'SENT_OTP'
        },
        EMAIL_SENT: {
            statusCode:200,
            customMessage : 'Email has been successfully sent',
            type : 'EMAIL_SENT'
        },
        VERIFICATION: {
            statusCode:200,
            customMessage : 'Your account is successfully verified',
            type : 'EMAIL_SENT'
        }
    }
  };
  
  
  let swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
  ];
  
  let SCREEN_TO_SHOW = {
    HOMEPAGE : 'HOMEPAGE',
    TRACKING : 'TRACKING',
    FEEDBACK : 'FEEDBACK'
  };
  
  let notificationMessages = {
    verificationCodeMsg: 'Your 4 digit verification code for Seed Project is {{four_digit_verification_code}}',
    registrationEmail: {
        emailMessage : "email message comes here",
        emailSubject: "Email subject"
    },
  };
  
  let languageSpecificMessages = {
    verificationCodeMsg : {
        EN : 'Your 4 digit verification code for Seed Project is {{four_digit_verification_code}}',
        ES_MX : 'Your 4 digit verification code for Seed Project is {{four_digit_verification_code}}'
    }
  };
  
  let cryptoCompareAPI_URL = {
      gettingCoinData : "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=",
      getCoinsList: "https://www.cryptocompare.com/api/data/coinlist/"
  };

  /** BASE64 PATTERN **/
  let TEST_BASE64_PATTERN = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  /** subtract number of days  **/
  let SUBTRACT_DATE = {
      NUMBER_OF_DAYS: [30, 60],
      KEY: 'days'
  };



  /**Application constants**/
  let APP_CONSTANTS = {
    SERVER: SERVER,
    DATABASE: DATABASE,
    SCREEN_TO_SHOW : SCREEN_TO_SHOW,
    STATUS_MSG: STATUS_MSG,
    notificationMessages: notificationMessages,
    languageSpecificMessages: languageSpecificMessages,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
    cryptoCompareAPI_URL: cryptoCompareAPI_URL,
    TEST_BASE64_PATTERN,
    SUBTRACT_DATE: SUBTRACT_DATE
  };
  
  module.exports = APP_CONSTANTS;