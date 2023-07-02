import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import "./style.css";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Incorrect Credentials!");
    }
  };

  if (redirect) {
    return <Navigate to={"/Admin"} />;
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Login to your Account
      </h1>
      <form style={{ maxWidth: "400px", margin: "0 auto" }} onSubmit={login}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Email</label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="name@example"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
