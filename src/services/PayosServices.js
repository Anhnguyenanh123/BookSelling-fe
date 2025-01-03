import axios from "axios";

const PAYOS_API_URL = "http://localhost:8080/api/payOs";

export const createPayment = async (orderId) => {
  try {
    const response = await axios.post(`${PAYOS_API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};
