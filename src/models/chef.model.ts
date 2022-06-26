import mongoose, { Document, Schema } from 'mongoose';

export interface IChef {
    name: string;
    image: string;
    cdn: string;
    description: string;
    restaurants: string[];
}

export interface IChefModel extends IChef, Document {}

const ChefSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        cdn: { type: String, required: true },
        description: { type: String, required: true },
        restaurants: { type: [Schema.Types.ObjectId], required: true, ref: 'Restaurant' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IChefModel>('Chef', ChefSchema);
