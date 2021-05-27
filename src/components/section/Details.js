import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/Details.css";
import firebase from "firebase";
import { addCart } from "../../actions/CartAction";

function Details() {
  const { cart } = useSelector((state) => state.CartReducer);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const db = firebase.firestore();
      const data = await db.collection("products").get();
      setProducts(data.docs.map((doc) => doc.data()));
    };
    getProducts();
  }, []);

  useEffect(() => {
    const product = products.filter(
      (item) => item.id === Number(location.state)
    );
    setProductDetails(product);
  }, [location.state, products]);

  const addToCart = async (id) => {
    const product = products.filter((item) => item.id === Number(id));
    const check = cart.find((item) => item.id === Number(id));
    if (!!check) {
      alert("the product has been added to cart");
    } else {
      dispatch(addCart(product));
    }
  };
  return (
    <>
      {productDetail.map(({ titulo, valor, tagImg, descrição, id }, index) => (
        <div className="details" key={index}>
          <img src={tagImg} alt="img-item" />
          <div className="box">
            <div className="row">
              <h2>{titulo}</h2>
              <span>R$ {valor}</span>
            </div>
            <button className="cart" onClick={() => addToCart(`${id}`)}>
              Add to Cart
            </button>
            <p>{descrição}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Details;
