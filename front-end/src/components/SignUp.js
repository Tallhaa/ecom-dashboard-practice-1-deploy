import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert("Enter All Values");
    }
    console.log(name, email, password);
    let result = await fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    result = await result.json();
    console.log(result);

    if (result.result == "Email Exist") {
      alert("Email already Exist");
    } else if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col px-8 mt-5 items-center mb-4 min-h-screen">
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Enter You Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Enter You Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Enter You Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp} variant="info">
        Sign Up
      </Button>
    </div>
  );
};
export default SignUp;
