
const express = require('express');
const CardToken = require('../schema/CardToken');
const mongoose = require('mongoose');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message:"Serving Users on the Endpoint."
    });   
});

router.get("/list", (req, res, next) => {
    CardToken.find({})
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
    console.log("entered to add")
    const NewCardToken = new CardToken({
        _id: mongoose.Types.ObjectId(),
        cardNumber: req.body.cardNumber,
        securityCode:req.body.securityCode,
        dueDate: req.body.dueDate,
        cardHolder: req.body.cardHolder,
        cardHolderTypeId: req.body.cardHolderTypeId,
        cardHolderNumberId: req.body.cardHolderNumberId,
        createdAt: Date.now(),
        updatedAt: Date.now()

    });

    NewCardToken.save()
    .then(result => {
        res.status(200).json({
            docs:[NewCardToken]
        });
    })
    .catch(err => {
        console.log(err);
    });
});

router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    CardToken.findById(rid)
        .exec()
        .then(docs => {
            docs.remove();
            res.status(200).json({
                deleted:true
            });
        })
        .catch(err => {
            console.log(err)
        });
});

module.exports = router;