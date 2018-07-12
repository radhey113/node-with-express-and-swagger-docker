
/**
 * @swagger
 * resourcePath: /User
 * description: All about API
 */


/** login api
 * @swagger
 * path: /api/login
 * operations:
 *   -  httpMethod: GET
 *      summary: Login with username/email and password
 *      notes: Login user with username/email and password
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: username
 *          description: Your username here
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */



/** login api
 * @swagger
 * path: /api/register
 * operations:
 *   -  httpMethod: POST
 *      summary: Signup with username, email and password
 *      notes: Signup with username, email and password
 *      responseClass: User
 *      nickname: register_user
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: User registration here
 *          name: body
 *          paramType: body
 *          dataType: User
 *          schema:
 *           $ref: "#/models/User"
 *
 */


/** login api
 * @swagger
 * path: /api/forgotPassword
 * operations:
 *   -  httpMethod: POST
 *      summary: Forget password api for otp
 *      notes: Returns an OTP for forget password
 *      responseClass: FORGOT
 *      nickname: register_user
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: Returns an OTP for forget password
 *          name: body
 *          paramType: body
 *          dataType: FORGOT
 *          schema:
 *           $ref: "#/models/FORGOT"
 *
 */



/** login api
 * @swagger
 * path: /api/changePassword
 * operations:
 *   -  httpMethod: POST
 *      summary: changePassword for users with OTP
 *      notes: Change password api is used for changing password using OTP
 *      responseClass: ChangePassword
 *      nickname: change_password
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: ChangePassword  here
 *          name: body
 *          paramType: body
 *          dataType: ChangePassword
 *          schema:
 *           $ref: "#/models/ChangePassword"
 *
 */




/** file upload api
 * @swagger
 * path: /api/fileUpload
 * operations:
 *   -  httpMethod: POST
 *      summary: file upload api
 *      notes: file upload api for user
 *      nickname: change_password
 *      parameters:
 *        - in: formData
 *          name: file
 *          dataType: file
 *          required: true
 *          description: The file to upload.
 *
 */



/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: String
 *       email:
 *         type: String
 *   FORGOT:
 *     id: FORGOT
 *     properties:
 *       email:
 *         type: String
 *   ChangePassword:
 *     id: ChangePassword
 *     properties:
 *       email:
 *         type: String
 *       otp:
 *         type: String
 *       password:
 *         type: String
 */





