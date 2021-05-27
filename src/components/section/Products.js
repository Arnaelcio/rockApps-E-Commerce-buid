import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../css/Products.css";
import firebase from "firebase";
import { addCart } from "../../actions/CartAction";
import banner from "../../images/rock-banner.png";

function Products() {
  const { is_Auth, email_Registrado } = useSelector(
    (state) => state.RegisteredUsersReducer
  );
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [cardView, setCardView] = useState(true);
  const [search, setSearch] = useState("");

  const FilteredProducts = products.filter((product) =>
    product.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const cardOrList = () => {
    setCardView(!cardView);
  };

  useEffect(() => {
    const getProducts = async () => {
      const db = firebase.firestore();
      const data = await db.collection("products").get();
      setProducts(data.docs.map((doc) => doc.data()));
    };
    const checkCart = async () => {
      const db = firebase.firestore();
      const data = await db.collection("usersCarts").get();
      const dataMap = data.docs.map((doc) => doc.id);
      const res = dataMap.find((item) => {
        return item === email_Registrado;
      });
      const docRef = db.collection("usersCarts").doc(res);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (JSON.stringify(doc.data().product) === "{}")
              console.log("Document data:", doc.data().product);
          }
          if (doc.exists) {
            if (JSON.stringify(doc.data().product) !== "{}") {
              if (doc.data().product.length === cart.length) {
                return null;
              } else {
                dispatch(addCart(doc.data().product));
              }
            }
          } else {
            db.collection("usersCarts")
              .doc(`${email_Registrado}`)
              .set({ product: {} });
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    getProducts();
    checkCart();
  }, [dispatch, email_Registrado]);

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
      {!!is_Auth ? (
        <>
          {!!cardView
            ? FilteredProducts.map(({ titulo, tagImg, valor, id }, index) => (
                <div className="card" key={index}>
                  <Link
                    to={{
                      pathname: `/product/${titulo}`,
                      state: `${id}`,
                    }}
                  >
                    <img src={tagImg} alt="product-img" />
                  </Link>
                  <div className="content">
                    <Link
                      to={{
                        pathname: `/product/${titulo}`,
                        state: `${id}`,
                      }}
                    >
                      <h3>{titulo}</h3>
                    </Link>
                    <span>R$ {valor}</span>
                    <button onClick={() => addToCart(`${id}`)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            : FilteredProducts.map(
                ({ titulo, tagImg, valor, id, descrição }, index) => (
                  <div className="list" key={index}>
                    <img src={tagImg} alt="img-item" />
                    <div className="box">
                      <div className="row">
                        <h2>{titulo}</h2>
                        <span>R$ {valor}</span>
                      </div>
                      <button
                        className="cart"
                        onClick={() => addToCart(`${id}`)}
                      >
                        Add to Cart
                      </button>
                      <p>{descrição.slice(0, 120)} .....</p>
                      <Link
                        to={{
                          pathname: `/product/${titulo}`,
                          state: `${id}`,
                        }}
                        className="cart"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                )
              )}

          <div className="left-side-bar">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexFlow: "column",
              }}
            >
              <button onClick={() => cardOrList()}>
                Mudar Visualização
                <span>{cardView ? ": Cards" : ": List"}</span>
              </button>
              <input
                placeholder="Filtrar Produtos"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </div>
            <br></br>
            <div>
              <img style={{ width: "250px" }} alt="banner" src={banner} />
            </div>
            <br></br>
            <div>
              <img style={{ width: "250px" }} alt="banner" src={banner} />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Você não está logado</h1>
          <h3>Faça login para continuar</h3>
        </>
      )}
    </>
  );
}

export default Products;
