import React, { useEffect } from "react";
import "../css/Login.css";
import { useHistory } from "react-router-dom";
import { init } from "ityped";
import { useSelector, useDispatch } from "react-redux";
import { getUserAdmin, getPassAdmin } from "../../actions/AdminAction";
import firebase from "../../services/firebase";

function AdminPage() {
  const history = useHistory();
  const { user_Admin, pass_Admin } = useSelector((state) => state.AdminReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const myElement = document.querySelector(".typing");
    init(myElement, {
      showCursor: true,
      strings: [" dar vida às suas ideias.", " superar desafios."],
    });
  }, []);

  const loginAsAdmin = async () => {
    const db = firebase.firestore();
    const users = await db.collection("admin").get();
    const res = users.docs.map((doc) => doc.data());
    const user = res.find((item) => item.adm === user_Admin);
    const pwd = res.find((item) => item.pwd === pass_Admin);
    if (user && pwd) {
      history.push("/register-products");
    } else {
      alert("useuario ou senha incorretos ");
    }
  };
  return (
    <div className="login">
      <main>
        <div className="wellcome">
          <h4>CONHEÇA A ROCKAPPS.</h4>
          <br></br>
          <h2>
            Desenvolvemos soluções para ajudar <br></br>você a
            <span className="typing"></span>
          </h2>
          <br></br>
          <h4>
            Fornecemos soluções de software com preços competitivos e
            complexidade variada para empresas, startups e indivíduos.
          </h4>
        </div>
        <fieldset className="fieldset-login">
          <legend>Admin</legend>
          <label>
            user
            <input
              onChange={(e) => dispatch(getUserAdmin(e.target.value))}
            ></input>
          </label>
          <label>
            pwd
            <input
              onChange={(e) => dispatch(getPassAdmin(e.target.value))}
            ></input>
          </label>
          <button onClick={() => loginAsAdmin()} type="button">
            Login As Admin
          </button>
        </fieldset>
      </main>
    </div>
  );
}
export default AdminPage;
