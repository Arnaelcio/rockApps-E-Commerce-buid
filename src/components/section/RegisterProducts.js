import React, { useState, useEffect } from "react";
import "../css/Products.css";
import firebase from "firebase";

function RegisterProducts() {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [newId, setNewId] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const db = firebase.firestore();
      const data = await db.collection("products").get();
      const biggerId = data.docs
        .map((doc) => doc.data())
        .map((ite) => ite.id)
        .sort((a, b) => b - a);
      setNewId(biggerId[0] + 1);
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      // console.log(e.target.files[0]);
      setImg(e.target.files[0]);
      document.getElementById("img-prev").src = URL.createObjectURL(
        e.target.files[0]
      );
    }
  };
  const handleSave = async () => {
    if ([img, title, value, description].includes("")) {
      alert("all fields are mandatory");
    } else {
      const uploadTask = firebase
        .storage()
        .ref(`images-products/${img.name}`)
        .put(img);
      uploadTask.on(
        "STATE_CHANGED",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref("images-products")
            .child(img.name)
            .getDownloadURL()
            .then((url) => {
              const db = firebase.firestore();
              db.collection("products").add({
                id: newId,
                count: 1,
                titulo: title,
                tagImg: url,
                valor: value,
                descrição: description,
              });
            });
        }
      );
    }
    setValue("");
    setTitle("");
    document.getElementById("img-prev").src = "#";
  };
  return (
    <>
      <div id="products"></div>

      <div className="card">
        <div className="content">
          <img
            id="img-prev"
            alt="product-img"
            src="#"
            style={{ width: "100%", height: "300px" }}
          />
          <input type="file" onChange={handleChange}></input>
          <input
            value={title}
            placeholder="Titulo do Produto"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            value={value}
            placeholder="Valor do Produto"
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <textarea
            value={description}
            placeholder="Descrição do Produto"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={() => handleSave()}>Add Product</button>
        </div>
      </div>
    </>
  );
}

export default RegisterProducts;
