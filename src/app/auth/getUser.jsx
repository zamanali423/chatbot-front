import axios from "axios";
import Cookies from "js-cookie";

const getUser = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = response.data;
    return user;
  } catch (error) {
    console.error("❌ Failed to fetch user profile:", error);

    // Clear invalid data
    Cookies.remove("token");
    localStorage.removeItem("user");

    return null;
  }
};

export default getUser;
