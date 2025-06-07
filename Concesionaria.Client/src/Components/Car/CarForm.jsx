import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import usePostCar from "../../hooks/usePostCar";
import { usePutCar } from "../../hooks/usePutCar";

import Input from "../Input";
import Button from "../Button";

import "../../Styles/CarForm.css";

const CarForm = ({ carToEdit = null, onSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { saveCar } = usePostCar();
  const { editCar, loading, error } = usePutCar();

  const onSubmit = async (data) => {
    try {
      if (carToEdit && carToEdit.id) {
        await editCar(carToEdit.id, data);
      } else {
        await saveCar(data);
      }

      if (onSuccess) onSuccess();
      navigate("/");
    } catch (err) {
      console.error("Error al guardar:", err.message || err);
    }
  };

  useEffect(() => {
    if (carToEdit) {
      setValue("marca", carToEdit.marca || "");
      setValue("modelo", carToEdit.modelo || "");
      setValue("motor", carToEdit.motor || "");
      setValue("precio", carToEdit.precio || "");
      setValue("color", carToEdit.color || "");
      setValue("kilometraje", carToEdit.kilometraje || "");
    }
  }, [carToEdit, setValue]);

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="car-form">
      <Input
        {...register("marca", {
          required: "La marca del vehiculo es requerida",
          minLength: {
            value: 2,
            message: "Debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "Debe tener menos de 20 caracteres",
          },
        })}
        type="text"
        placeholder="Marca"
      />
      {errors.marca && <span className="error-form">{errors.marca.message}</span>}

      <Input
        {...register("modelo", {
          required: "El modelo del vehiculo es requerido",
          minLength: {
            value: 2,
            message: "Debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "Debe tener menos de 20 caracteres",
          },
        })}
        type="text"
        placeholder="Modelo"
      />
      {errors.modelo && <span className="error-form">{errors.modelo.message}</span>}

      <Input
        {...register("motor", {
          required: "El motor del vehiculo es requerido",
          minLength: {
            value: 2,
            message: "Debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 3,
            message: "Debe tener menos de 3 caracteres",
          },
        })}
        type="text"
        placeholder="Motor"
      />
      {errors.motor && <span className="error-form">{errors.motor.message}</span>}

      <Input
        {...register("precio", {
          required: "El precio es requerido",
          min: { value: 0, message: "El precio debe ser positivo" },
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Formato de precio inválido",
          },
        })}
        type="number"
        step="0.01"
        placeholder="Precio"
      />
      {errors.precio && <span className="error-form">{errors.precio.message}</span>}

      <Input
        {...register("color", {
          required: "El color es requerido",
          minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
        })}
        type="text"
        placeholder="Color"
      />
      {errors.color && <span className="error-form">{errors.color.message}</span>}

      <Input
        {...register("kilometraje", {
          required: "El kilometraje es requerido",
          pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números",
          },
        })}
        type="text"
        placeholder="Kilometraje"
      />
      {errors.kilometraje && <span className="error-form">{errors.kilometraje.message}</span>}

      {error && <p className="error-form">Error: {error.message || "Error desconocido"}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : carToEdit ? "Editar Carro" : "Crear Carro"}
      </Button>
      <Button
        type="button"
        onClick={handleCancel}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default CarForm;