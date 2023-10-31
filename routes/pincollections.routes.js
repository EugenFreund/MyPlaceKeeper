const express = require('express');
const router = express.Router();
const PinCollection = require('../models/PinCollection.model');

// CREATE a new collection
router.post('/', async (req, res, next) => {
    try {
        const newPinColletction = await PinCollection.create(req.body);
        res.status(201).json(newPinColletction);
    } catch (error) {
        next(error);
    }
});

// READ all collections
router.get('/', async (req, res, next) => {
    try {
        const collections = await PinCollection.find();
        res.json(collections);
    } catch (error) {
        next(error);
    }
});

// READ a single collection
router.get('/:collectionId', async (req, res, next) => {
    const { collectionId } = req.params;
    try {
        const collection = await PinCollection.findById(collectionId);
        res.status(200).json(collection);
    } catch (error) {
        next(error);
    }
    res.json(res.pin);
});

// UPDATE a collection
router.put('/:collectionId', async (req, res, next) => {
    const { collectionId } = req.params;
    try {
        const updatedCollection = await PinCollection.findByIdAndUpdate(collectionId, req.body, { new: true });
        res.status(200).json(updatedCollection);
    } catch (error) {
        next(error);
    }
});

// DELETE a pin
router.delete('/:collectionId', async (req, res) => {
    const { collectionId } = req.params;
    try {
        await PinCollection.findByIdAndDelete(collectionId);
        res.status(200).json('Pin collection has been deleted...');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
