import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import usePostCar from "../../hooks/usePostCar";
import { usePutCar } from "../../hooks/usePutCar";
import Input from "../Input";
import Button from "../Button";

const CarForm = ({ carToEdit = null, onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    motor: "",
  });
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { saveCar } = usePostCar();
  const { editCar, loading, error } = usePutCar();

  useEffect(() => {
    if (carToEdit) {
      setFormData({
        marca: carToEdit.marca || "",
        modelo: carToEdit.modelo || "",
        motor: carToEdit.motor || "",
      });
    } else {
      setFormData({ marca: "", modelo: "", motor: "" });
    }
  }, [carToEdit]);

  useEffect(() => {
    if (error) {
      console.error("Error recibido del hook usePutCar:", error);
      setSubmitError(error.message || "Error desconocido");
      setSubmitSuccess(false);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (carToEdit && carToEdit.id) {
        await editCar(carToEdit.id, formData);
      } else {
        await saveCar(formData);
      }

      setSubmitSuccess(true);
      if (onSuccess) onSuccess();

      navigate("/");
    } catch (err) {
      setSubmitError(err.message || "Error al guardar el carro");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="marca"
        placeholder="Marca"
        value={formData.marca}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="modelo"
        placeholder="Modelo"
        value={formData.modelo}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="motor"
        placeholder="Motor"
        value={formData.motor}
        onChange={handleChange}
        required
      />

      {submitError && <p style={{ color: "red" }}>Error: {submitError}</p>}
      {submitSuccess && <p style={{ color: "green" }}>Guardado exitoso!</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : carToEdit ? "Editar Carro" : "Crear Carro"}
      </Button>
      <Button
        type="button"
        onClick={handleCancel}
        style={{ marginLeft: "10px" }}
        disabled={loading}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default CarForm;
