import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const ExpenseDashboardPage = () => ( <div>This is the dashboard</div> )
const AddExpensePage = () => ( <div>This is the add expense page</div> )
const EditExpensePage = () => ( <div>This is the edit expense page</div> )
const HelpPage = () => ( <div>This is the help page</div> )

// The const above holds a function that implicitly returns us a JSX template.
// We give the function reference to Route.

const router = (
  <BrowserRouter>
    <div>
      <Route path="/create" component={ AddExpensePage }/>
      <Route path="/edit" component={ EditExpensePage }/>
      <Route path="/help" component={ HelpPage }/>
      <Route path="/" component={ ExpenseDashboardPage } exact={true}/>

    </div>
  </BrowserRouter>
)

// What we want to render and where do we want it displayed
// React identifies components as those that have an uppercase initial letter - lowercase it assumes are just html
ReactDOM.render(router, document.getElementById('app'))