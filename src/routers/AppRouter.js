import {BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import React from "react";

const ExpenseDashboardPage = () => ( <div>This is the dashboard</div> )
const AddExpensePage = () => ( <div>This is the add expense page</div> )
const EditExpensePage = () => ( <div>This is the edit expense page</div> )
const HelpPage = () => ( <div>This is the help page</div> )
// The consts above hold a function that implicitly returns us a JSX template.
// We give the function reference to Route.

// The link here is client-side routing.  If we had used <a href="/">Go home</a> it would have been server-side routing
const NotFoundPage = () => (
  <div>
    Page not found 404 - <Link to="/">Go to the home page</Link>
  </div> )

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <p><NavLink to="/" exact={true} activeClassName="isactive">HOME</NavLink></p>
    <p><NavLink to="/create" activeClassName="isactive">CREATE</NavLink></p>
    <p><NavLink to="/edit" activeClassName="isactive">EDIT</NavLink></p>
    <p><NavLink to="/help" activeClassName="isactive">HELP</NavLink></p>
  </header>
)

// There is no path for the NotFoundPage so this will always be a match.  It has to come last otherwise
// that component would appear on every page as well as the other matching components
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/create" component={ AddExpensePage }/>
        <Route path="/edit" component={ EditExpensePage }/>
        <Route path="/help" component={ HelpPage }/>
        <Route path="/" component={ ExpenseDashboardPage } exact={true}/>
        <Route component={ NotFoundPage }/>
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;