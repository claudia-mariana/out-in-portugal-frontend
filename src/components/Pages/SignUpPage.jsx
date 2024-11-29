import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/auth.service";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center py-20 mb-32">
      {/* Left Half - Proposition Text */}
      <div className="flex flex-col items-start justify-center p-10 space-y-4 w-full md:w-2/5">
        <p className="text-white text-3xl sm:text-4xl font-bold">
          Join us to showcase Portugal's outdoor activities to everyone.
        </p>
        <p className="text-yellow text-3xl sm:text-4xl font-bold">
          Create and manage your events on our platform!
        </p>
      </div>
  
      {/* Right Half - Sign Up Form */}
      <div className="w-full md:w-3/5 p-10 md:p-20 bg-white rounded-lg shadow-md mt-10 md:mt-0">
        <h1 className="text-2xl font-bold text-center text-blue mb-6">Sign Up</h1>
  
        <form onSubmit={handleSignUpSubmit} className="space-y-6">
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
  
          <div>
            <label className="block text-blue">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              className="w-full p-2 border border-blue-medium rounded-md"
            />
          </div>
  
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-medium text-white py-2 px-4 rounded-md hover:text-yellow transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
  
        {errorMessage && (
          <p className="text-red text-center mt-4">{errorMessage}</p>
        )}
  
        <p className="text-blue-medium text-center mt-4">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-blue-medium hover:text-yellow">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
