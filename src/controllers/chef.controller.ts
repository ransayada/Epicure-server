import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Chef from '../models/chef.model';

const createChef = (req: Request, res: Response, next: NextFunction) => {
    const { name, image, cdn, description, restaurants } = req.body;

    const chef = new Chef({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        image,
        cdn,
        restaurants
    });

    return chef
        .save()
        .then((chef) => res.status(201).json({ chef }))
        .catch((error) => res.status(500).json({ error }));
};
const readChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    return Chef.findById(chefId)
        .then((chef) => (chef ? res.status(200).json({ chef }) : res.status(404).json({ message: `Chef: [${chefId}] not found` })))
        .catch((err) => res.status(500).json({ err }));
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Chef.find()
        .then((chefs) => res.status(200).json({ chefs }))
        .catch((err) => res.status(500).json({ err }));
};
const updateChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    return Chef.findById(chefId)
        .then((chef) => {
            if (chef) {
                chef.set(req.body);
                return chef
                    .save()
                    .then((chef) => res.status(201).json({ chef }))
                    .catch((err) => res.status(500).json({ err }));
            } else {
                res.status(404).json({ message: `Chef: [${chefId}] not found` });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};
const deleteChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    return Chef.findByIdAndDelete(chefId)
        .then((chef) => (chef ? res.status(201).json({ message: `Chef: [${chefId}] deleted` }) : res.status(404).json({ message: `Chef: [${chefId}] not found` })))
        .catch((err) => res.status(500).json({ err }));
};

export default { createChef, readChef, readAll, updateChef, deleteChef };
