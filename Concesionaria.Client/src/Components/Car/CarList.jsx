import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useGetCar from "../../hooks/useGetCar";
import useDeleteCar from "../../hooks/useDeleteCar";

import Button from "../Button";

const CarList = () => {
  const { car, loading, error } = useGetCar();
  const { deleteCar } = useDeleteCar();

  // Estado local para manejar la lista de autos
  const [carList, setCarList] = useState([]);

  // Cada vez que "car" cambia (datos del hook), actualizamos el estado local
  useEffect(() => {
    if (car) {
      setCarList(car);
    }
  }, [car]);

  if (loading) return <p>Cargando autos...</p>;
  if (error) return <p>Error al cargar autos: {error.message}</p>;

  const handleDelete = async (id) => {
    if (window.confirm("¿Quieres eliminar este vehículo?")) {
      try {
        await deleteCar(id);
        // Filtramos el carro eliminado y actualizamos el estado local
        setCarList((prev) => prev.filter((c) => c.id !== id));
        alert("Auto eliminado correctamente");
      } catch (error) {
        alert("Error al eliminar auto");
      }
    }
  };

  return (
    <div>
      <h2>Lista de Autos</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Motor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carList.map((c) => (
            <tr key={c.id}>
              <td>{c.marca}</td>
              <td>{c.modelo}</td>
              <td>{c.motor}</td>
              <td>
                <Link to={`/form-car/${c.id}`}>
                  <Button className="update-car-btn">Actualizar</Button>
                </Link>
              </td>
              <td>
                <Button
                  className="delete-car-btn"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button className="save-car-btn">
        <Link className="link-btn" to="/form-car">
          Agregar Auto
        </Link>
      </Button>
    </div>
  );
};

export default CarList;