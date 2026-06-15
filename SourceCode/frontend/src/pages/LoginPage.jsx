import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const userCredential =
              await signInWithEmailAndPassword(
                      auth,
                      email,
                      password
              );

      const token =
              await userCredential.user.getIdToken(true);

      console.log(token);

      alert("Login successful");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
          <div>

            <h2>Login</h2>

            <input
                    placeholder="Email"
                    onChange={(e) =>
                            setEmail(e.target.value)}
            />

            <br />

            <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                            setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleLogin}>
              Login
            </button>

          </div>
  );
}

export default LoginPage;