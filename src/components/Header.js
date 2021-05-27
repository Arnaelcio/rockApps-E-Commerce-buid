import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IS_REGISTERING } from "../actions/RegisterUserAction";
import { Link } from "react-router-dom";
import Cart from "./svg/shopping-cart-solid.svg";
import RockLogo from "../images/rockapps-no-headline-light-white_03.png";
import "./css/Header.css";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase";
import { isAuth } from "../actions/RegisteredUserAction";
import { NavItem } from "./NavItem";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { is_Auth } = useSelector((state) => state.RegisteredUsersReducer);
  const { cart } = useSelector((state) => state.CartReducer);
  const [profile, setProfile] = useState(false);
  const [files, setFiles] = useState(null);

  const profileToggle = (showOrhidden) => {
    setProfile(showOrhidden);
  };
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setFiles(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (files === null) {
      return null;
    } else {
      const uploadTask = firebase
        .storage()
        .ref(`images/${files.name}`)
        .put(files);
      uploadTask.on(
        "STATE_CHANGED",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref("images")
            .child(files.name)
            .getDownloadURL()
            .then((url) => {
              document.getElementById("new-img").src = url;
              console.log(url);
            });
        }
      );
    }
  }, [files]);
  const logout = () => {
    profileToggle(!profile);
    dispatch(isAuth());
    history.push("/");
    window.location.reload(false);
  };
  return (
    <>
      <header>
        <nav className="header-top-bar">
          <ul>
            <NavItem
              label="trabalhe conosco"
              link={{
                name: "trabalhe-conosco",
                href: "https://www.rockapps.com.br/contato/trabalhe-conosco/",
              }}
            />
            <NavItem
              icon={faLinkedinIn}
              link={{
                name: "linkedin",
                href: "https://www.linkedin.com/company/rockapps",
              }}
            />
          </ul>
          <ul>
            <NavItem
              label="+55 (21) 96711-1145"
              icon={faWhatsapp}
              link={{
                name: "whats1",
                href: "https:/api.whatsapp.com/send?phone=5521967111145",
              }}
            />
            <NavItem
              label="+55 (11) 98135-3145"
              icon={faWhatsapp}
              link={{
                name: "whats2",
                href: "https:/api.whatsapp.com/send?phone=+551198135-3145",
              }}
            />
            <NavItem label=" contato@rockapps.com.br" icon={faEnvelope} />
            {!is_Auth ? (
              <Link to="/admin">
                <NavItem label=" adim" icon={faUser} />
              </Link>
            ) : null}
            {!!is_Auth ? (
              <div className="nav-cart">
                <span>{cart.length}</span>
                <Link to="/cart">
                  <img src={Cart} alt="svg-menu" width="30" />
                </Link>
              </div>
            ) : null}
          </ul>
        </nav>
        <div className="header-main">
          <div className="logo">
            {!is_Auth ? (
              <Link to="/">
                <img src={RockLogo} alt="svg-logo" />
              </Link>
            ) : (
              <Link to="/product">
                <img src={RockLogo} alt="svg-logo" />
              </Link>
            )}
          </div>
          <nav>
            <ul>
              {!is_Auth ? (
                <Link to="/">
                  <NavItem label="Home" />
                </Link>
              ) : (
                <Link to="/product">
                  <NavItem label="Home" />
                </Link>
              )}
              <NavItem
                label="Empresa"
                link={{
                  name: "empresa",
                  href: "https://www.rockapps.com.br/empresa/",
                }}
              />
              <NavItem
                label="Blog"
                link={{
                  name: "blog",
                  href: "https://www.rockapps.com.br/blog/",
                }}
              />
              {!is_Auth ? (
                <li
                  onClick={() =>
                    dispatch({
                      type: IS_REGISTERING,
                    })
                  }
                >
                  Cadastrar
                </li>
              ) : (
                <>
                  <li className="photo-profile">Logado</li>
                </>
              )}
              <ul
                className={
                  !profile ? "profile-config hidden" : "profile-config"
                }
              >
                <li>
                  <label htmlFor="selecao-arquivo">
                    <span data-tooltip="tamanho indicado da imagem 200 x 200 px">
                      Foto de perfil &#187;
                    </span>
                  </label>
                  <input
                    className="file"
                    onChange={handleChange}
                    id="selecao-arquivo"
                    type="file"
                  />
                </li>
                <li>GitHub</li>
                <li>LinkedIn</li>
                <li onClick={logout}>Sair</li>
              </ul>
            </ul>
          </nav>
          {!!is_Auth ? (
            <div className="div-rounded-perfil">
              <img
                className="rounded-perfil"
                id="new-img"
                onClick={() => profileToggle(!profile)}
                alt="rounded-perfil"
                src="https://media-exp1.licdn.com/dms/image/C4D03AQHaVRZZcihQLw/profile-displayphoto-shrink_200_200/0/1597895372684?e=1626912000&v=beta&t=EFuxs3BQChG5MgWuQHABEnLtBbffJ_nzi_qZ9ZZDv0k"
              ></img>
            </div>
          ) : (
            <div className="div-rounded-perfil"></div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
