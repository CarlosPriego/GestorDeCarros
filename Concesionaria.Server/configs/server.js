'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { sequelize } from './mysql.js';

import '../src/models/car.model.js';

import carRoutes from '../src/routes/car.route.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended:false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use('/concesionaria/v1/car', carRoutes)
}

export const initServer= async() => {
    const app = express();
    const port = process.env.port || 3000;

    try {
        middlewares(app);
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`)
    } catch (e) {
        console.log(`Server init failed: ${e}`)
    }
}

export const main = async () => {
    try {
      await sequelize.authenticate();
      console.log("Conexion a la base de datos exitosa");
      await sequelize.sync({alter: true});
      console.log("Tabla Actualizada");
    } catch (err) {
      console.log("Error al conectarse a la base de dato: ", err);
    }
  };