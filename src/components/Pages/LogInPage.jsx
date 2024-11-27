import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LogInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-blue mb-6">Log In</h1>

      <form onSubmit={handleLogInSubmit} className="space-y-4">
        <div>
          <label className="block text-blue">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="w-full p-2 border border-blue-medium rounded-md"
          />
        </div>

        <div>
          <label className="block text-blue">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="w-full p-2 border border-blue-medium rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-medium text-white py-2 px-4 rounded-md hover:text-yellow transition-colors"
          >
            Log In
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className="text-red text-center mt-4">{errorMessage}</p>
      )}

      <p className="text-blue-medium text-center mt-4">
        Don't have an account yet?{" "}
        <Link to={"/auth/signup"} className="text-blue-medium hover:text-yellow">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LogInPage;