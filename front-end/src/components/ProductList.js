import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { Button } from "react-bootstrap";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    console.log(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`/search/${key}`);
      result = await result.json();
      setProducts(result);
    } else {
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    try {
      let result = await fetch("/products");
      result = await result.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch("/product/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    fetchProducts();
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/login");
    }
    fetchProducts();
  }, []);
  return (
    <div className="w-4/5 mx-auto pb-40">
      <input
        type="text"
        className="px-8 py-4 w-full rounded-md border border-gray-300 outline-gray-400"
        placeholder="search products"
        onChange={handleSearch}
      />
      <h1 className="text-center py-4 overflow-auto">Product</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Comapany</th>
            <th>Category</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, i) => (
              <tr key={product._id}>
                <td>{i + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.company}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Link to={"/update/" + product._id}>
                    <Button variant="outline-warning">Update</Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <td className="text-center" colSpan={6}>
              No Data Found
            </td>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductList;
