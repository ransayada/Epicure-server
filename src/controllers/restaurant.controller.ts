import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Restaurant from '../models/restaurant.model';

const createRestaurant = (req: Request, res: Response, next: NextFunction) => {
    const { name, image, cdn, open, close, stars, latitude, longitude, dishes } = req.body;

    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name,
        image,
        cdn,
        open,
        close,
        stars,
        latitude,
        longitude,
        dishes
    });

    return restaurant
        .save()
        .then((restaurant) => res.status(201).json({ restaurant }))
        .catch((error) => res.status(500).json({ error }));
};
const readRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return Restaurant.findById(restaurantId)
        .then((restaurant) => (restaurant ? res.status(200).json({ restaurant }) : res.status(404).json({ message: `Restaurant: [${restaurantId}] not found` })))
        .catch((err) => res.status(500).json({ err }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Restaurant.find()
        .then((restaurants) => res.status(200).json({ restaurants }))
        .catch((err) => res.status(500).json({ err }));
};
const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return Restaurant.findById(restaurantId)
        .then((restaurant) => {
            if (restaurant) {
                restaurant.set(req.body);
                return restaurant
                    .save()
                    .then((restaurant) => res.status(201).json({ restaurant }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: `Restaurant: [${restaurantId}] not found` });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    return Restaurant.findByIdAndDelete(restaurantId)
        .then((restaurant) => (restaurant ? res.status(201).json({ message: `Restaurant: [${restaurantId}] deleted` }) : res.status(404).json({ message: `Restaurant: [${restaurantId}] not found` })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createRestaurant, readRestaurant, readAll, updateRestaurant, deleteRestaurant };
