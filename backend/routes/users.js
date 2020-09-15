const express = require('express');
const router = express.Router();
const { User } = require("../models/user");
const { Products } = require("../models/products");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get('/allUsers', (req, res) => {
    User.find()
        .then(data => {
            console.log("got users")
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});


router.get("/auth", auth, (req, res) => {
    console.log("Authentication")
    res.status(200)
        .json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            cart: req.user.cart,
            history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    // Find E-mail
    
            User.findOne({ email: req.body.email }, (err, user) => {
                if (!user)
                    return res.json({
                        loginSuccess: false,
                        message: "Login failed, email not found"
                    });
    //comparre passwords                
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "Wrong password" });
    // generate tokens            
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth ", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, message: "Login success", isAuth: true
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post('/addToCart', auth, (req, res) => {
    User.findOne({_id: req.user._id})
        , (err, user) => {

            let duplicate = false;

            console.log("add to cartuserinfo",user)

            user.cart.forEach((cartInfo) => {
                if(cartInfo.id === req.query.productId){
                    duplicate = true
                }
            })

            if(duplicate) {
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id":req.query.productId},
                    {$inc: {"cart.$.quantity": 1}},
                    {new : true},
                    (err, user) => {
                        if(err) return res.json({success: false, err});
                        res.status(200).json(user.cart)
                    } 
                )
            }
            else {
                User.findOneAndUpdate(
                    {_id: req.user._id },
                    {
                        $push : {
                            cart: {
                                id: req.query.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    {new: true},
                    (err, user) => {
                        if(err) return res.json({success:false, err});
                        res.status(200).json(user.cart)
                    } 
                )
            }
        }
});

router.get('/removeFromCart', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Products.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
})


router.get('/userCartInfo', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            Products.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true, cartDetail, cart })
                })

        }
    )
})


module.exports = router;