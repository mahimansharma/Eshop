const express = require('express');
const router = express.Router();
const { Products } = require("../models/products");

const { auth } = require("../middleware/auth");

router.get('/mobiles', (req, res) => {
    
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    
    Products.find()
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .then(data => {
            console.log("got data")
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

});


router.post('/mobiles', (req, res) => {
    const mobiles = new Products(req.body);
    mobiles
        .save()
        .then(result => {
            console.log("result",result);
        })
        .catch(err => console.log('err', err));
        res.status(201).json({
        message: "post dta"
    })
});

router.delete('/mobiles/:name', (req, res) =>
    Products.deleteOne({
        name: req.params.name
    }, (err, data) => {
        console.log('delte result',data)
        if (err) {
            res.send('error removing')
        } else {
            console.log(data);
            res.status(204);
        }
    }));

router.delete('/mobiles/delete/:id', (req, res) => {
    Products.findByIdAndRemove(req.params.id)
        .exec()
        .then(data => {
            if (!data) {
                return res.status(404).end();
            }
            return res.status(204).end();
        })
        .catch(err => next(err));
})


router.get("/products_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    console.log("productIds", productIds)


    //we need to find the product information that belong to product Id 
    Products.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});
//generates the list of products in the cart



module.exports = router;