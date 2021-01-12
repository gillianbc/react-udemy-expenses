import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

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
    <p><Link to="/">HOME</Link></p>
    <p><Link to="/create">CREATE</Link></p>
    <p><Link to="/edit">EDIT page</Link></p>
    <p><Link to="/help">HELP</Link></p>
  </header>
)


// There is no path for the NotFoundPage so this will always be a match.  It has to come last otherwise
// that component would appear on every page as well as the other matching components
const router = (
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

// What we want to render and where do we want it displayed
// React identifies components as those that have an uppercase initial letter - lowercase it assumes are just html
ReactDOM.render(router, document.getElementById('app'))