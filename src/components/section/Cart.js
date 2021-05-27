import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import "../css/Details.css";
import "../css/Cart.css";
import { deleteProduct, upDateProduct } from "../../actions/CartAction";
import Payment from "./Payment";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);
  const [total, setTotal] = useState(0);
  const [paymentShow, setPaymentShow] = useState(false);
  const { is_Auth, email_Registrado } = useSelector(
    (state) => state.RegisteredUsersReducer
  );

  const increase = (id) => {
    cart.filter((item) =>
      item.id === id ? { ...item, ...(item.count += 1) } : item
    );

    const db = firebase.firestore();
    db.collection("usersCarts").doc(`${email_Registrado}`).update({
      product: cart,
    });
    dispatch(upDateProduct(cart));
    getTotal();
  };
  const reduction = (id) => {
    cart.filter((item) =>
      item.id === id
        ? item.count === 1
          ? { ...item, ...(item.count = 1) }
          : { ...item, ...(item.count -= 1) }
        : item
    );
    const db = firebase.firestore();
    db.collection("usersCarts").doc(`${email_Registrado}`).update({
      product: cart,
    });
    dispatch(upDateProduct(cart));
    getTotal();
  };

  const removeProduct = (id) => {
    const product = cart.filter((item) => item.id === Number(id));
    const db = firebase.firestore();
    db.collection("usersCarts")
      .doc(`${email_Registrado}`)
      .update({
        product: firebase.firestore.FieldValue.arrayRemove(product[0]),
      });
    dispatch(deleteProduct(id));
    getTotal();
  };

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      return prev + item.valor * item.count;
    }, 0);
    setTotal(res);
  };

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.valor * item.count;
      }, 0);
      setTotal(res);
    };
    getTotal();
    const updataCartCount = async () => {
      const db = firebase.firestore();
      const data = await db.collection("usersCarts").get();
      const re = data.docs.map((doc) => doc.id);
      const res = re.find((item) => {
        return item === email_Registrado;
      });
      await db.collection("usersCarts").doc(res).update({
        product: cart,
      });
    };
    updataCartCount();
  }, [cart, email_Registrado]);

  const togglePaymentPage = () => {
    setPaymentShow(!paymentShow);
  };

  const verifyCartIsEmpty = JSON.stringify(cart) === "[]";
  return (
    <>
      {is_Auth ? (
        <div style={{ marginLeft: "1%" }}>
          {!verifyCartIsEmpty ? (
            cart.map((item, index) => (
              <div className="details cart" key={index}>
                <img src={item.tagImg} alt="img-item" />
                <div className="box">
                  <div className="row">
                    <h2>{item.titulo}</h2>
                    <span>R$ {(item.valor * item.count).toFixed(2)}</span>
                  </div>
                  <p>{item.descrição}</p>
                  <div className="amount">
                    <button
                      className="count"
                      onClick={() => reduction(item.id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span>{item.count}</span>
                    <button className="count" onClick={() => increase(item.id)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
                <div className="delete" onClick={() => removeProduct(item.id)}>
                  X
                </div>
              </div>
            ))
          ) : (
            <h2>Carrinho Vazio</h2>
          )}
          <div>
            <div className="total">
              {!verifyCartIsEmpty ? (
                <button
                  onClick={() => {
                    togglePaymentPage();
                    window.scrollTo(0, 0);
                  }}
                >
                  Payment
                </button>
              ) : null}
              <h3>Total: R$ {total.toFixed(2)}</h3>
              {paymentShow ? (
                <Payment
                  label="Fechar"
                  onClick={() => togglePaymentPage()}
                ></Payment>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Cart;
