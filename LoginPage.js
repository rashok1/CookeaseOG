import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in:", userCredential.user);
    } catch (err) {
      console.error("❌ Login failed:", err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>🔐 Login to Cookease</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Password:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>

          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
