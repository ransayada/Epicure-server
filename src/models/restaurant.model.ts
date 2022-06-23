import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant {
    name: string;
    image: string;
    cdn: string;
    open: string;
    close: string;
    stars: number;
    latitude: string;
    longitude: string;
    dishes: string[];
}

export interface IRestaurantModel extends IRestaurant, Document {}

const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        cdn: { type: String, required: true },
        open: { type: String, required: true },
        close: { type: String, required: true },
        stars: { type: Number, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
        dishes: { type: [Schema.Types.ObjectId], required: true, ref: 'Dish' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IRestaurantModel>('Restaurant', RestaurantSchema);
