import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./Login.css";

function Login({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      onLogin();
      navigate("/");
    };
  
    return (
      <div className="login__page" >
        <h1>Login</h1>
        <hr className="hr"/>
        <div className="login card ">
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
    
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login__actions">
            <Button 
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            
            <Button 
              variant="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div> 
        </div>
      </div>
    );
  }
  
  export default Login;