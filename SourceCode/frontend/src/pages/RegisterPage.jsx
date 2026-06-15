import { useState } from "react";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/firebase";

function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Registration successful");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div>

      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  );
}

export default RegisterPage;