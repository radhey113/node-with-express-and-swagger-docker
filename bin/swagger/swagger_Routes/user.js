
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
 *      summary: Login with username and password
 *      notes: Returns a user based on username
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
 *      summary: signup with username and password
 *      notes: Returns a user based on username
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
 *      summary: signup with username and password
 *      notes: Returns a user based on username
 *      responseClass: FORGOT
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
 *      summary: changePassword for users
 *      notes: change password api is used for changing password using otp
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
 *      summary: changePassword for users
 *      notes: change password api is used for changing password using otp
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
 *       username:
 *         type: String
 *       otp:
 *         type: String
 *       password:
 *         type: String
 */





