import { useState } from "react";
import { putCarService } from "../service/carService"; 

export const usePutCar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editCar = async (id, carData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await putCarService(id, carData);
      setLoading(false);
      return res;
    } catch (error) {
      console.error("Error al editar el carro en editCar:", error);
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { editCar, loading, error };
};