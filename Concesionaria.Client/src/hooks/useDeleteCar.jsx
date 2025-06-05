import { deleteCarService } from "../service/carService";

const useDeleteCar = () => {
    const deleteCar = async (id) => {
        try {
            await deleteCarService(id);
        } catch (error) {
            console.error('Error al eliminar al carro:', error);
            throw error;
        }
    };

    return { deleteCar }
}

export default useDeleteCar;

