import { Car } from '../models/car.model.js';

export const saveCar = async (req, res) => {
    try {
        const { marca, modelo, motor, precio, color, kilometraje } = req.body;

        const car = await Car.create({
            marca,
            modelo,
            motor,
            precio,
            color,
            kilometraje
        });

        return res.status(201).json({
            message: 'Car registration successful',
            carDetails: car
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Car registration failed',
            error: error.message
        });
    }
};

export const getCar = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;

        const car = await Car.findAll({
            where: { estado: true },
            offset: Number(desde),
            limit: Number(limite)
        });

        return res.status(200).json({
            success: true,
            car
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Cars",
            error: error.message
        });
    }
};

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Car.findOne({ where: { id, estado: true } });

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        return res.status(200).json({
            success: true,
            car
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting Car',
            error: error.message
        });
    }
};

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, motor, precio, color, kilometraje } = req.body;

        const car = await Car.findByPk(id);

        if (!car || !car.estado) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        car.marca = marca;
        car.modelo = modelo;
        car.motor = motor;
        car.precio = precio;
        car.color = color;
        car.kilometraje = kilometraje;

        await car.save();

        return res.status(200).json({
            success: true,
            message: 'Car updated',
            car
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating car',
            error: error.message
        });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Car.findByPk(id);

        if (!car || !car.estado) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        car.estado = false;
        await car.save();

        res.status(200).json({
            success: true,
            message: 'Car deleted logically',
            car
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting car',
            error: error.message
        });
    }
};