export interface Country {
    _id: string;
    name: string;
    code: string;
    population: number;
    region: string;
    image: string | File | null | {
        url: string;
        public_id: string;
    };
}
