import React, { Component } from "react";
import Login from "./section/Login";
import AdminPage from "./section/AdminPage";
import RegisterProducts from "../components/section/RegisterProducts";
import Products from "./section/Products";
import Details from "./section/Details";
import Cart from "./section/Cart";
import Payment from "./section/Payment";
import { Route } from "react-router-dom";

export class Section extends Component {
  render() {
    return (
      <section>
        <Route exact path="/" component={Login} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/register-products" component={RegisterProducts} />
        <Route exact path="/product" component={Products} />
        <Route path="/product/:titulo" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/payment" component={Payment} />
      </section>
    );
  }
}

export default Section;
