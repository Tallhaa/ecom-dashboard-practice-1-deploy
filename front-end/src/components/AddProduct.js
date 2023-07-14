import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
  }, []);

  const handleAddProduct = async () => {
    console.log(name, price, company, category);
    let result = await fetch("/add-product", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, company, category }),
    });
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col px-8 mt-5 items-center mb-4 min-h-screen">
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="px-2 py-3 border border-sky-400 w-2/5 rounded-sm mb-4 focus: outline-none text-black"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Button variant="outline-success" onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
};
export default AddProduct;
