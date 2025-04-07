import axios from "axios";

export const fetchProducts = async () => {
  try {
    // const response = await axios.get("https://fakestoreapi.in/api/products");
    const response = await axios.get("http://localhost:5000/api/products/");
    // console.log(response);
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
};