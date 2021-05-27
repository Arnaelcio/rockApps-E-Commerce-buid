import React, { useEffect } from "react";
import "../css/Login.css";
import { useHistory } from "react-router-dom";
import { init } from "ityped";
import { useSelector, useDispatch } from "react-redux";
import {
  getNameRegister,
  getEmailRegister,
  getPwdRegister,
  isRegistering,
} from "../../actions/RegisterUserAction";
import {
  getEmailRegistered,
  getPassRegistered,
  isAuth,
} from "../../actions/RegisteredUserAction";
import firebase from "../../services/firebase";

function Login() {
  const history = useHistory();
  const { Is_Registering, Nome_Registro, Email_Registro, Senha_Registro } =
    useSelector((state) => state.RegisterUserReducer);
  const { email_Registrado, pass_Registrada } = useSelector(
    (state) => state.RegisteredUsersReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const myElement = document.querySelector(".typing");
    init(myElement, {
      showCursor: true,
      strings: [" dar vida às suas ideias.", " superar desafios."],
    });
  }, []);

  const handleRegister = () => {
    const db = firebase.firestore();
    db.collection("registeredUsers")
      .add({
        email: Email_Registro,
        nome: Nome_Registro,
        senha: Senha_Registro,
      })
      .then(() => {
        alert(`Usuário Cadastrado Registrado com sucesso`);
      });
    dispatch(isRegistering());
    dispatch(getNameRegister(""));
    dispatch(getEmailRegister(""));
    dispatch(getPwdRegister(""));
  };

  const login = async () => {
    const db = firebase.firestore();
    const users = await db.collection("registeredUsers").get();
    const res = users.docs.map((doc) => doc.data());
    const email = res.find((item) => item.email === email_Registrado);
    const pwd = res.find((item) => item.senha === pass_Registrada);
    if (email && pwd) {
      dispatch(isAuth());
      history.push("/product");
    } else {
      alert("email ou senha incorretos ou usuário não cadastrado");
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
        {!Is_Registering ? (
          <fieldset className="fieldset-login">
            <legend>Login</legend>
            <label>
              email
              <input
                onChange={(e) => dispatch(getEmailRegistered(e.target.value))}
              ></input>
            </label>
            <label>
              senha
              <input
                onChange={(e) => dispatch(getPassRegistered(e.target.value))}
              ></input>
            </label>
            <button onClick={() => login()} type="button">
              Login
            </button>
          </fieldset>
        ) : (
          <fieldset className="register">
            <legend>Cadastrar Email</legend>
            <label>
              nome
              <input
                value={Nome_Registro}
                onChange={(e) => dispatch(getNameRegister(e.target.value))}
              ></input>
            </label>
            <label>
              email
              <input
                value={Email_Registro}
                onChange={(e) => dispatch(getEmailRegister(e.target.value))}
              ></input>
            </label>
            <label>
              senha
              <input
                value={Senha_Registro}
                onChange={(e) => dispatch(getPwdRegister(e.target.value))}
              ></input>
            </label>
            <button onClick={() => handleRegister()} type="button">
              Cadastrar
            </button>
          </fieldset>
        )}
      </main>
    </div>
  );
}
export default Login;
