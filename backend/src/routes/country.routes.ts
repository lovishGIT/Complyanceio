import express from 'express';
import * as CountryController from '../controllers/country.controller.js';
import { upload } from '../middlewares/upload.multer.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = express.Router();

router
    .route('/add')
    .post(verifyJWT, upload.single('image'), CountryController.addCountry);

router
    .route('/')
    .get(CountryController.getAllCountries);

router
    .route("/name/:name")
    .get(CountryController.getCountryByName);

router
    .route("/:id")
    .get(CountryController.getCountriesById)
    .patch(verifyJWT, upload.single('image'), CountryController.updateCountryById)
    .delete(verifyJWT, CountryController.deleteCountryById);

export default router;