import { Router } from "express";
import { check } from 'express-validator';
import { saveCar, getCar, getCarById, updateCar, deleteCar } from "../controllers/car.controller.js";

const router = Router();

const carValidators = [
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio').not().isEmpty(),
    check('motor', 'El motor es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un número positivo').isFloat({ min: 0 }),
    check('color', 'El color es obligatorio').not().isEmpty(),
    check('kilometraje', 'El kilometraje es obligatorio').not().isEmpty(),
];

router.post('/', carValidators, saveCar);

router.get('/', getCar);

router.get('/:id',
    check('id', 'El id no es un UUID válido').isUUID(),
    getCarById
);

router.put('/:id',
    [
        check('id', 'El id no es un UUID válido').isUUID(),
        ...carValidators
    ],
    updateCar
);

router.delete('/:id',
    check('id', 'El id no es un UUID válido').isUUID(),
    deleteCar
);

export default router;