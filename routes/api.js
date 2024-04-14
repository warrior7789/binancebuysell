const express = require('express');
const router = express.Router();
const ValidationMiddleware = require('../middleware/validationMiddleware');
const checkAuth = require('../middleware/auth');
const userController = require('../controllers/userController');


/**
 * @swagger
 * /api/buy:
 *   post:
 *     summary: buy Crypto 
 *     description: buy Crypto 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 default: "DOGEUSDT"
 *               order_type:
 *                 type: string
 *                 default: "market or limit"
 *               quantity :
 *                 type: integer
 *                 default: 50
 *               price :
 *                 type: integer
 *     responses:
 *       200:
 *         description: buy successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/buy', ValidationMiddleware.validateBuy(),ValidationMiddleware.validate, userController.buy);


/**
 * @swagger
 * /api/sell:
 *   post:
 *     summary: Sell Crypto 
 *     description: Sell Crypto 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 default: "BTCUSDT"
 *               order_type:
 *                 type: string
 *                 default: "market or limit"
 *               quantity :
 *                 type: integer
 *               price :
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sell successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/sell', ValidationMiddleware.validateBuy(),ValidationMiddleware.validate, userController.sell);


/**
 * @swagger
 * /api/order-lists:
 *   post:
 *     summary: order-lists
 *     description: order-lists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limit:
 *                 type: integer
 *                 default: 10
 *               page_no:
 *                 type: integer
 *                 default: 1 
 *     responses:
 *       200:
 *         description: Sell successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/order-lists', userController.orderLists);


module.exports = router;
