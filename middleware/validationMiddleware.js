const { validationResult ,check } = require('express-validator');
const UserModel = require.main.require('./models/user'); 
const validateName = (value) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) {
        throw new Error('Name must not include special or numeric characters');
    }
    return true;
};

const validateEmail = async (value) => {
    const user = await UserModel.findOne({email:value})
    if (user) {
        throw new Error('Email Already exist');
    }
    return true;
};
class ValidationMiddleware { 
	static validate(req, res, next) {
	    const errors = validationResult(req);
	    if (!errors.isEmpty()) {
	        let message = []
	        let i=0
	        for(let error of errors.array()){
	            message[i++] =error.msg
	        }
	        return res.status(400).send({
	            data: {},
	            message: message.join(', '),
	        })
	        //return res.status(422).json({ errors: errors.array() });
	    }
	    next();
	}
	static validateBuy() {
	    return [
	        check('symbol').notEmpty().withMessage('Symbol is required'),
	        check('quantity').notEmpty(),
	        check('order_type').notEmpty(),
	        check('price').custom((value,{req, loc, path}) => {
	        	console.log("req.body.order_type",req.body.order_type)
	            if (req.body.order_type !="market") {
	                // trow error if passwords do not match
	                if(value <= 0){
	                	throw new Error("price is required for limit order");
	                }else{
	                	return true;
	                }
	            } else {
	            	console.log("else req.body.order_type",req.body.order_type)
	                return true;
	            }
	        }).withMessage('price is required for limit order')	        
	    ];
	}
	
}
module.exports = ValidationMiddleware;