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
});

// READ a single collection by user
router.get('/user/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const collection = await PinCollection.find({ user: userId });
        res.status(200).json(collection);
    } catch (error) {
        next(error);
    }
});

// POST a pin to a collection
router.post('/:collectionId/pins/:pinId', async (req, res, next) => {
    const { collectionId, pinId } = req.params;
    try {
        const collection = await PinCollection.findById(collectionId)
        if (collection.pins.includes(pinId)) return res.status(400).json({ message: 'Pin already in collection' });

        const updatedCollection = await PinCollection.findByIdAndUpdate(collectionId, { $push: { pins: pinId } }, { new: true });
        res.status(200).json(updatedCollection);
    } catch (error) {
        next(error);
    }
});

// READ all pins in a collection
router.get('/:collectionId/pins', async (req, res, next) => {
    const { collectionId } = req.params;
    try {
        const collection = await PinCollection.findById(collectionId).populate('pins');
        res.status(200).json(collection.pins);
    } catch (error) {
        next(error);
    }
});

// DELETE a pin from a collection
router.delete('/:collectionId/pins/:pinId', async (req, res, next) => {
    const { collectionId, pinId } = req.params;
    try {
        const updatedCollection = await PinCollection.findByIdAndUpdate(collectionId, { $pull: { pins: pinId } }, { new: true });
        res.status(200).json(updatedCollection);
    } catch (error) {
        next(error);
    }
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
