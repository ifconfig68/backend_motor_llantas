import axios from "axios";

export const getVehicleByPlate = async (plate) => {
  const { data } = await axios.get(`http://localhost:3002/api/vehicle/${plate}`);
  return data;
};
