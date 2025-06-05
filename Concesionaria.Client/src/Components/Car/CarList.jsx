import React from 'react';
import useGetCar from '../../hooks/useGetCar';

const CarList = () => {
  const { car, loading, error } = useGetCar();

  if (loading) return <p>Cargando autos...</p>;
  if (error) return <p>Error al cargar autos: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Autos</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Motor</th>
          </tr>
        </thead>
        <tbody>
          {car.map((c) => (
            <tr key={c.id || c._id}>
              <td>{c.marca}</td>
              <td>{c.modelo}</td>
              <td>{c.motor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
