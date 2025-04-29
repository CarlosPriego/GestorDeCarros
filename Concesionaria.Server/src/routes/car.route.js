import { Router } from "express";
import { saveCar, getCar, getCarById, updateCar, deleteCar } from "../controllers/car.controller.js";

const router = Router();

router.post('/', saveCar);

router.get('/', getCar);

router.get('/:id', getCarById);

router.put('/:id', updateCar);

router.delete('/:id', deleteCar);

export default router;
