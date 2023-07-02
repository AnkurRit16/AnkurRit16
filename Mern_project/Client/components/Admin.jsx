import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";
export const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ name, username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration successful! Please login to continue.");
      setRedirect(true);
    } else {
      alert("Sorry, Registration Failed!");
    }
  };

  if (redirect) {
    return <Navigate to={"/Userlogin"} />;
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Create new Account
      </h1>
      <form style={{ maxWidth: "400px", margin: "0 auto" }} onSubmit={register}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Full name"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="userame"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="name@example"
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            required
          />
        </div>
        { <div style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div> }
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
