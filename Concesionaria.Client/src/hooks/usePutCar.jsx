import { putCarService } from "../sevice/carService";

import { useState } from "react";

export const usePutCar = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editCar = async (id, carData) => {
        setLoading(true);

        try {
            await putCarService(id, carData);
            setLoading(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error al editar el carro: ', error);
            setError(error);
            setLoading(false)
        }
    };

    return { editCar, loading, error }
}