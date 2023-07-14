import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter Correct Details");
    }
    console.log(email, password);
    let result = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    result = await result.json();
    console.log(result);
    if (result.result == "No User Found") {
      alert("No User Found");
    } else if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col px-8 items-center mb-4 mt-5 min-h-screen">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Enter You Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Enter You Password"
      />
      <button
        onClick={handleLogin}
        className="px-6 py-3 rounded-lg outline-1 bg-slate-400 text-lg mb-4"
      >
        Login
      </button>
    </div>
  );
};
export default Login;
