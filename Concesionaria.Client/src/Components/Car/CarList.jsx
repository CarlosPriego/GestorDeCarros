import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useGetCar from "../../hooks/useGetCar";
import useDeleteCar from "../../hooks/useDeleteCar";

import Button from "../Button";
import "../../Styles/CarList.css";

const CarList = () => {
  const { car, loading, error } = useGetCar();
  const { deleteCar } = useDeleteCar();

  const [carList, setCarList] = useState([]);

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
        setCarList((prev) => prev.filter((c) => c.id !== id));
        alert("Auto eliminado correctamente");
      } catch (error) {
        alert("Error al eliminar auto");
      }
    }
  };

  return (
    <div className="car-list">
      <h2>Lista de Autos</h2>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Motor</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Kilometraje</th>
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
              <td>${c.precio}</td>
              <td>{c.color}</td>
              <td>{c.kilometraje} km</td>
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
                  Eliminar
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
