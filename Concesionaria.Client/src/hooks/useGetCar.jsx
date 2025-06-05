import { useState, useEffect } from "react";
import { getCarService } from "../sevice/carService";

const useGetCar = () => {
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { car } = await getCarService();
        setCar(Array.isArray(car) ? car : []);
      } catch (error) {
        console.error("Error al obtener carros: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { car, loading, error };
};

export default useGetCar;
