import { Schema, model, Document } from 'mongoose';

interface ICountry extends Document {
    name: string;
    code: string;
    population: number;
    region: string;
    image?: {
        url: string;
        public_id: string;
    };
}

const countrySchema = new Schema<ICountry>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    population: {
        type: Number,
        min: 1,
        default: 1,
    },
    region: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: { type: String, required: false },
        public_id: { type: String, required: false },
    },
});

const Country = model<ICountry>('Country', countrySchema);

export default Country;
