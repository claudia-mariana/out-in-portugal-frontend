import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

 // POST /auth/signup
  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
  };

  // POST  /auth/login
 login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

// GET  /auth/verify
  verify = () => {
    return this.api.get("/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;