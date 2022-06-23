import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Dish from '../models/dish.model';

const createDish = (req: Request, res: Response, next: NextFunction) => {
    const { name, ingredients, image, cdn, icon, price } = req.body;

    const dish = new Dish({
        _id: new mongoose.Types.ObjectId(),
        name,
        ingredients,
        image,
        cdn,
        icon,
        price
    });

    return dish
        .save()
        .then((dish) => res.status(201).json({ dish }))
        .catch((error) => res.status(500).json({ error }));
};
const readDish = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    return Dish.findById(dishId)
        .then((dish) => (dish ? res.status(200).json({ dish }) : res.status(404).json({ message: `Dish: [${dishId}] not found` })))
        .catch((err) => res.status(500).json({ err }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Dish.find()
        .then((dishes) => res.status(200).json({ dishes }))
        .catch((err) => res.status(500).json({ err }));
};
const updateDish = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    return Dish.findById(dishId)
        .then((dish) => {
            if (dish) {
                dish.set(req.body);
                return dish
                    .save()
                    .then((dish) => res.status(201).json({ dish }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: `Dish: [${dishId}] not found` });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const deleteDish = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;

    return Dish.findByIdAndDelete(dishId)
        .then((dish) => (dish ? res.status(201).json({ message: `Dish: [${dishId}] deleted` }) : res.status(404).json({ message: `Dish: [${dishId}] not found` })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createDish, readDish, readAll, updateDish, deleteDish };
