import "./Login.css";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Logo from "../../assets/logo.png";
import AppleIcon from '@mui/icons-material/Apple';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import axios from "axios";

export default function Login({ visibile, setStatus, setVisible }) {
  const [element, setelement] = useState("Login");
  const [undo, setundo] = useState("false");
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/userDB");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Server connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  function Valid() {
    if (!email.match(email_regex)) {
      setMessage("Please enter a valid email address");
      return false;
    }
    if (pass.length < 4) {
      setMessage("Password must be at least 4 characters");
      return false;
    }
    return true;
  }

  async function Login() {
    try {
      if (!email || !pass) {
        setMessage("Please fill in all fields");
        return;
      }

      if (!Valid()) {
        return;
      }

      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/userDB?email=${email}`);
      const user = response.data[0];

      if (!user) {
        setMessage("User not found");
        return;
      }

      if (user.password !== pass) {
        setMessage("Incorrect password");
        return;
      }

      localStorage.setItem("loginStatus", "true");
      localStorage.setItem("email", email);
      setVisible(false);
      setStatus("true");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  async function Signup() {
    try {
      if (!email || !pass || !cpass) {
        setMessage("Please fill in all fields");
        return;
      }

      if (pass !== cpass) {
        setMessage("Passwords do not match");
        return;
      }

      if (!Valid()) {
        return;
      }

      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/userDB?email=${email}`);
      const existingUser = response.data[0];

      if (existingUser) {
        setMessage("User already exists");
        return;
      }

      await axios.post("http://localhost:8000/userDB", {
        email,
        password: pass,
        cart: []
      });

      localStorage.setItem("loginStatus", "true");
      localStorage.setItem("email", email);
      setVisible(false);
      setStatus("true");
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Server connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    
    if (element === 'Login') {
      Login();
    } else {
      Signup();
    }
  }

  return (
    <div>
      {undo === "false" && (
        <div className="snooplay-login-container">
          <div className="snooplay-login-box">
            <div className="close" onClick={() => setVisible(false)}>
              <CloseIcon />
            </div>
            <div className="snooplay-logo">
              <img src="https://snooplay.in/cdn/shop/files/Snooplay_logo_medium_1_220x.png?v=1659702830" alt="Snooplay Logo" />
            </div>
            <h2>{element} to Snooplay</h2>
            <div className="buttons">
              <div id={element === "Login" ? "btnlogin" : "btn"}></div>
              <button className="login" onClick={() => { setelement("Login"); setMessage(""); }}>Log In</button>
              <button className="login" onClick={() => { setelement("Sign Up"); setMessage(""); }}>Sign Up</button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
              </div>

              {element === "Sign Up" && (
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={cpass}
                    onChange={(e) => setCpass(e.target.value)}
                    placeholder="Confirm password"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              {message && <p className="error-message">{message}</p>}

              <div className="remember-me">
                <input type="checkbox" id="remember-me" disabled={isLoading} />
                <label htmlFor="remember-me">
                  {element === "Login" ? "Remember me" : "I agree to the terms"}
                </label>
              </div>

              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? "Please wait..." : element}
              </button>
            </form>

            {element === "Login" && (
              <>
                <div className="forgot-password">
                  <a href="#">Forgot your password?</a>
                </div>
                <div className="social-login-buttons">
                  <button className="social-login google" disabled={isLoading}>
                    <GoogleIcon /> Continue with Google
                  </button>
                  <button className="social-login apple" disabled={isLoading}>
                    <AppleIcon /> Continue with Apple
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}