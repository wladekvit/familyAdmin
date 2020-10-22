import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Categories from "./Categories";
import AddDebit from "./AddDebit";
import AddCredit from "./AddCredit";

export const routes = {
  home: "/",
  categories: "/categories",
  addCredit: "/credit",
  addDebit: "/debit"
};

export const Router = () => {
  return (
    <Switch>
      <Route path={routes.home} component={Home} exact />
      <Route path={routes.categories} component={Categories} />
      <Route path={routes.addDebit} component={AddDebit} />
      <Route path={routes.addCredit} component={AddCredit} />
    </Switch>
  );
};