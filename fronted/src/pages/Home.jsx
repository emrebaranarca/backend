import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';
import axios from 'axios';




const Home = () => {
  const [product_name, setProduct_name] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [stock, setStock] = useState('');


  const [products, setProducts] = useState([]);

  const handleProduct_name = (e) => {
    setProduct_name(e.target.value);
  }
  const handlePrice = (e) => {
    setPrice(e.target.value);
  }
  const handleId = (e) => {
    setId(e.target.value);
  }
  const handleStock = (e) => {
    setStock(e.target.value);
  }

  





  const saveProduct = async () => {
    axios.post('http://localhost:3000/create', {
      product_name: product_name,
      price: price,
      stock: stock
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const showProduct = async () => {
    axios.get('http://localhost:3000/products')
      .then(function (response) {
        console.log(response);
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteProduct = async (ID) => {
    axios.delete(`http://localhost:3000/products/${ID}`).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  const updateProduct = async () => {
    axios.put(`http://localhost:3000/products/${id}`, {
      product_name: product_name,
      price: price,
      id: id,
      stock: stock
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div>
      <h1>ADMIN PANEL</h1> 
      <hr />
      <h6>PRODUCT NAME</h6>
      <Input name="product_name" onChange={handleProduct_name}   />
      <h6>PRODUCT PRICE</h6>
      <Input name="price" onChange={handlePrice} />
      <h6>PRODUCT ID </h6>
      <Input name="id" onChange={handleId} />
      <h6>PRODUCT STOCK</h6>
      <Input name="stock" onChange={handleStock} />
      <hr />
      <Button name="save" onClick={saveProduct}  />
      <Button name="show" onClick={showProduct}  />
      <Button name="update" onClick={updateProduct}  />
      <hr />
      {products.map((product) => (
        <div key={product.id}>
          <h6>PRODUCT NAME: {product.product_name}</h6>
          <h6>PRODUCT PRICE: {product.price}</h6>
          <h6>PRODUCT ID: {product.id}</h6>
          <h6>PRODUCT STOCK: {product.stock}</h6>
          <Button name="delete" onClick={()=>deleteProduct(product.id)}  />
        
          
          <hr />
        </div>
      ))}

      

    </div>
  );
};

export default Home;