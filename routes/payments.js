
const express = require('express');
const Payment = require('../schema/Payment');
const mongoose = require('mongoose');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message:"Serving Users on the Endpoint."
    });   
});

router.get("/list", (req, res, next) => {
    Payment.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
    });
});

router.post("/add", (req, res, next) => {
    console.log("entered to add in payments")
    const NewPayment = new Payment({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email:req.body.email,
        description: req.body.description,
        amount: req.body.amount,
        cardToken: req.body.cardToken,
        numberFees: req.body.numberFees,
        paymentMethod: req.body.paymentMethod,
        referenceNumber: req.body.referenceNumber,
        status: true,
        createdAt: Date.now(),
        updatedAt: Date.now()

    });

    NewPayment.save()
    .then(result => {
        res.status(200).json({
            docs:[NewPayment]
        });
    })
    .catch(err => {
        console.log(err);
    });
});

router.post("/reverse", (req, res, next) => {
    console.log("entered to reverse in payments")
    console.log("req")
    console.log(req)

    const rid = req.body.id;

    Payment.findById(rid)
        .exec()
        .then(doc => {
            doc.status ? doc.status = false : doc.status = true;
            doc.updatedAt = Date.now();
            doc.save();
            res.status(200).json({
                docs: [doc]
            });
        })
        .catch(err => {
            console.log(err)
    });
});

module.exports = router;