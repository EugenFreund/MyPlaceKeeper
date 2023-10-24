const express = require('express');
const router = express.Router();
const Pin = require('../models/Pin');

// CREATE a new pin
router.post('/', async (req, res, next) => {
    try {
        const newPin = await Pin.create(req.body);
        res.status(200).json(newPin);
    } catch (error) {
        next(error);
    }
});

// READ all pins
router.get('/', async (req, res, next) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        next(error);
    }
});

// READ a single pin
router.get('/:pinId', async (req, res, next) => {
    const { pinId } = req.params
    try {
        const pin = await Pin.findById(pinId);
        res.status(200).json(pin);
    } catch (error) {
        next(error);
    }
});

// UPDATE a pin
router.put('/:pinId', async (req, res, next) => {
    const { pinId } = req.params
    if (mongoose.isValidObjectId(pinId)) {
        try {
            const updatedPin = await Pin.findByIdAndUpdate( pinId, req.body, { new: true });
            res.status(200).json(updatedPin);
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: 'Not valid ObjectId' });
    }
});

// DELETE a pin
router.delete('/:pinId', async (req, res, next) => {
    const { pinId } = req.params
    if (mongoose.isValidObjectId(pinId)) {
        try {
            await Pin.findByIdAndDelete(req.params.id);
            res.status(200).json('Pin has been deleted...');
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: 'Not valid ObjectId' });
    }
});

module.exports = router;
