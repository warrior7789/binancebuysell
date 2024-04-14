const UserModel = require.main.require('./models/user'); 
const OrderModel = require.main.require('./models/order'); 
const common = require.main.require('./helper/common'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require('fs');
const absolutePath = path.resolve("./public/");


const Binance = require('binance-api-node').default;
var client = ""
if(process.env.binance_api_isTest == "true"){
    console.log("testingnngng")
    client = Binance({
        apiKey: process.env.binance_api_apiKey,
        apiSecret: process.env.binance_api_apiSecret,
        httpBase:"https://testnet.binance.vision"
    });
}else{
    client = Binance({
        apiKey: process.env.binance_api_apiKey,
        apiSecret: process.env.binance_api_apiSecret,       
    });
}


/* Buy API */
exports.buy = async (req, res, next) => {
    try {
        const {
            symbol,
            quantity,
            price,
            order_type
        } = req.body;          


        //console.log(await client.accountInfo())

        let  order =""
        if(order_type =="market"){
            order = await client.order({
                symbol: symbol,
                side: 'BUY',
                type: 'MARKET',
                quantity: quantity
            });

        }else{
            order = await client.order({
                symbol: symbol,
                side: 'BUY',
                type: 'LIMIT',
                quantity: quantity,
                price: price,
            });
        } 

        if(order){   
            // Accessing the fills array and its price value
            const fills = order?.fills; // Access the fills array
            const fillsPrice = fills[0]?.price?fills[0]?.price:price; // Access the price value of the first fill         
            await OrderModel.create({
                symbol      : symbol,
                side        : 'BUY',
                order_type  : order_type,
                quantity    : quantity,
                price       : fillsPrice,
                responce    : order
            })
        }
        res.status(200).json({
            data:order,
            status:1,
            message: "Order placed successful"
        });
       
       
    } catch (e) {
        //console.log(e)
        console.error(e);
        res.status(400).json({
            status:0,
            message: e.message
        });
       
    }
};

/* Sell API */
exports.sell = async (req, res, next) => {
    try {
        const {
            symbol,
            quantity,
            price,
            order_type
        } = req.body;
                
        let  order =""
        if(order_type =="market"){
            order = await client.order({
                symbol: symbol,
                side: 'SELL',
                type: 'MARKET',
                quantity: quantity
            });

        }else{
            order = await client.order({
                symbol: symbol,
                side: 'SELL',
                type: 'LIMIT',
                quantity: quantity,
                price: price,
            });
        } 

        if(order){           
            const fills = order?.fills; 
            const fillsPrice = fills[0]?.price?fills[0]?.price:price; 
            await OrderModel.create({
                symbol      : symbol,
                side        : 'BUY',
                order_type  : order_type,
                quantity    : quantity,
                price       : fillsPrice,
                responce    : order
            })
        }
        res.status(200).json({
            data:order,
            status:1,
            message: "Order placed successful"
        });
    } catch (e) {
        //console.log(e)
        console.error(e);
        res.status(400).json({
            status:0,
            message: e.message
        });
       
    }
};

/* Sell API */
exports.orderLists = async (req, res, next) => {
    try {


        let index = (req.body != undefined && req.body.page_no != undefined) ? req.body.page_no : 1
        let limit = (req.body != undefined && req.body.limit != undefined) ? req.body.limit : 10
        let skip = (index - 1) * limit

        let orders = await OrderModel.find().sort({createdAt:-1}).skip(Number(skip)).limit(Number(limit))
        
        res.status(200).json({
            data:orders,
            totalrecords : await OrderModel.countDocuments({}),
            status:1,
            message: "success"
        });
    } catch (e) {
        //console.log(e)
        console.error(e);
        res.status(400).json({
            status:0,
            message: e.message
        });
       
    }
};