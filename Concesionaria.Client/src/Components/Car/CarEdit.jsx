import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarByIdService } from "../../service/carService";
import CarForm from "./CarForm";

const CarEdit = () => {
  const { id } = useParams();
  const [carToEdit, setCarToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    getCarByIdService(id)
      .then((data) => {
        setCarToEdit(data.car);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando carro...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!carToEdit) return <p>No se encontró el carro para editar.</p>;

  return <CarForm carToEdit={carToEdit} />;
};

export default CarEdit;