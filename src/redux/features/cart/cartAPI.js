import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const createCart = async (userId, bookId, token) => {
  const response = await axios.post(
    `${BASE_URL}/cart/create/${userId}?bookId=${bookId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    }
  );
  return response.data; // Return the cart object
};

export const getCart = async (userId, token) => {
  const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });
  return response.data; // Return the cart object
};

export const updateCart = async (userId, bookId, quantity, token) => {
  const response = await axios.put(
    `${BASE_URL}/cart/update/${userId}/${bookId}?quantity=${quantity}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    }
  );
  return response.data; // Return the updated cart object
};

export const removeCart = async (userId, bookId, token) => {
  const response = await axios.delete(
    `${BASE_URL}/cart/remove/${userId}/${bookId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    }
  );
  return response.data; // Return the updated cart object
};

export const deleteCart = async (userId, token) => {
  const response = await axios.delete(`${BASE_URL}/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });
  return response.data; // Return the updated cart object
};
