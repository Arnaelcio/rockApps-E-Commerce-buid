import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/Payments.css";
function Payment({ label, onClick }) {
  const { cart } = useSelector((state) => state.CartReducer);
  const [payData, setPayData] = useState(false);
  const [namePayData, setNamePayData] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [numberCardInput, setNumberCardInput] = useState("");
  const [validityCardInput, setValidityCardInput] = useState("");
  const [cvvCardInput, setCvvCardInput] = useState("");
  const [total, setTotal] = useState("");

  const showPaydata = (e) => {
    setPayData(true);
    setNamePayData(e);
    getTotal();
  };

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      return prev + item.valor * item.count;
    }, 0);
    setTotal(res);
  };
  const showAlertTicketView = (e) => {
    e.preventDefault();
    alert(`
    Boleto Gerado com sucesso

    Nome do Sacado: ${nameInput}    
    Valor R$: ${total},00
    Data de Emissão: ${Date()}
    `);
  };
  const showAlertCardView = (e) => {
    e.preventDefault();
    alert(`
    Cartão cadastrado e compra efetuada com sucesso!!

    Nome do Titular: ${nameInput}
    cartão Nº: ${numberCardInput}    
    validade: ${validityCardInput}    
    cartão Nº: ${cvvCardInput}    
    Valor R$: ${total},00
    Data de Emissão: ${Date()}
    `);
  };
  const confirmOrder = (e) => {
    e.preventDefault();
    alert(`
    Pedido efetuado com sucesso!!

    Nome do Titular: ${nameInput}
    pedido Nº: ${Math.floor(Math.random() * 999999999)}    
    Valor R$: ${total},00
    Data de Emissão: ${Date()}
    `);
  };

  return (
    <>
      <div className="payment">
        <h2>Payment</h2>
        <span onClick={onClick}>{label}</span>
        <form>
          <fieldset className="details-payment cart">
            <legend>Cadastrar Dados</legend>
            <label>
              Nome
              <input onChange={(e) => setNameInput(e.target.value)}></input>
            </label>
            <label className="pgto">
              <p>Forma de Pgto</p>
              <div className="check">
                <label htmlFor="ticket">
                  <input
                    name="Boleto"
                    id="ticket"
                    type="checkBox"
                    onClick={(e) => showPaydata(e.target.name)}
                  ></input>
                  <span>Boleto</span>
                </label>
                <label htmlFor="cash">
                  <input
                    name="À Vista"
                    id="cash"
                    type="checkBox"
                    onClick={(e) => showPaydata(e.target.name)}
                  ></input>
                  <span>À Vista</span>
                </label>
                <label htmlFor="credit-card">
                  <input
                    name="Cartão"
                    id="credit-card"
                    type="checkBox"
                    onClick={(e) => showPaydata(e.target.name)}
                  ></input>
                  <span>Cartão</span>
                </label>
              </div>
            </label>
          </fieldset>
          {!!payData ? (
            <fieldset className="details-payment cart">
              <legend>{namePayData}</legend>
              {namePayData === "Cartão" ? (
                <>
                  <label>
                    Numero do Cartão
                    <input
                      onChange={(e) => setNumberCardInput(e)}
                      type="Number"
                    ></input>
                  </label>
                  <label>
                    Data de Validade
                    <input
                      onChange={(e) => setValidityCardInput(e.target.value)}
                      type="Text"
                    ></input>
                  </label>
                  <label>
                    CVV
                    <input
                      onChange={(e) => setCvvCardInput(e.target.value)}
                      type="Number"
                    ></input>
                  </label>
                  <button onClick={(e) => showAlertCardView(e)}>
                    Efetuar Cadastro e Pgto
                  </button>
                </>
              ) : namePayData === "Boleto" ? (
                <label>
                  <div>
                    <label>Boleto à Gerar</label>
                    <br></br>
                    <div>Valor Total: R${total} </div>
                    <br></br>
                    <div>Data: {Date()}</div>
                    <button onClick={(e) => showAlertTicketView(e)}>
                      Confirmar compra e Gerar Boleto
                    </button>
                  </div>
                </label>
              ) : namePayData === "À Vista" ? (
                <label>
                  <div>
                    <div>Passe em uma de nossas lojas</div>
                    <div>Leve o código do pedido</div>
                  </div>
                  <button onClick={(e) => confirmOrder(e)}>
                    Confirmar pedido e Gerar Código
                  </button>
                </label>
              ) : null}
            </fieldset>
          ) : null}
        </form>

        {/* {cart.map((item, index) => (
              <div className="details-payment cart" key={index}>
                <img src={item.tagImg} alt="img-item" />
                <div className="box">
                  <div className="row">
                    <h2>{item.titulo}</h2>
                    <span>R$ {(item.valor * item.count).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))} */}
      </div>
    </>
  );
}

export default Payment;
