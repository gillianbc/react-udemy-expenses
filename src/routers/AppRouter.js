import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import AddExpensePage from "../components/AddExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";

// There is no path for the NotFoundPage so this will always be a match.  It has to come last otherwise
// that component would appear on every page as well as the other matching components
// Note that we use :id to indicate a path param.  We omit the colon in the actual path e.g. edit/123
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/create" component={ AddExpensePage }/>
        <Route path="/edit/:id" component={ EditExpensePage }/>
        <Route path="/help" component={ HelpPage }/>
        <Route path="/" component={ ExpenseDashboardPage } exact={true}/>
        <Route component={ NotFoundPage }/>
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;