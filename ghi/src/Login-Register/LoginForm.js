import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await login(username, password);
     setTimeout(function () {window.location.replace("/")}, 1000)

    } catch (err) {
      console.log("Error caught in handleSubmit:", err);
      setErrorMessage("Failed to log in. Please check your credentials.");
    }
  };


  return (
    <div className="page-wrap">
    <div className="mb-3 form-bg offset-3 col-6 py-3">
      <h3 className="card-header mb-3">Login</h3>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                name="username"
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center py-1">
            <input className="button" type="submit" value="Login" />
          </div>
        </form>
        <div className="d-flex justify-content-center pt-2">
          <button className="button" onClick={() => navigate("/register")}>Don't have an account? <i>Register Here.</i></button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
