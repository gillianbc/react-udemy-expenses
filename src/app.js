import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from "./routers/AppRouter";
import 'normalize.css/normalize.css'
import './styles/styles.scss'

// What we want to render and where do we want it displayed
// React identifies components as those that have an uppercase initial letter - lowercase it assumes are just html
ReactDOM.render(<AppRouter/>, document.getElementById('app'))