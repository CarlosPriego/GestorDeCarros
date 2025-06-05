import { postCarService } from "../service/carService";

const usePostCar = () => {
    const saveCar = async (car) => {
        try {
            const response = await postCarService(car);
            return response
        } catch (error) {
            console.error('Error al guardar el carro: ', error);
            throw error
        }
    }

    return { saveCar };
}

export default usePostCar;