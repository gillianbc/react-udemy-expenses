import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const ExpenseDashboardPage = () => ( <div>This is the dashboard</div> )

// The const above holds a function that implicitly returns us a JSX template.
// We give the function reference to Route.

const router = (
  <BrowserRouter>
    <Route path="/" component={ ExpenseDashboardPage }/>
  </BrowserRouter>
)

// What we want to render and where do we want it displayed
// React identifies components as those that have an uppercase initial letter - lowercase it assumes are just html
ReactDOM.render(router, document.getElementById('app'))