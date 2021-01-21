// Higher Order Component - a component that renders another component
// What is this good for?
// - Code re-use
// - Render hijacking
// - Prop manipulation
// - Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// a bog standard react component
const Info = (props) => (
    <div>
        <h2> Information from the Wrapped Component</h2>
        <p> This is a props value that's been passed down: {props.info}</p>
        <p> I can also access the day prop: {props.day}</p>
    </div>
)

// a function that returns a stateless functional component
// We have to spread the props to pass them down
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <h1>The information here is from the Higher Order Component and the day prop is: {props.day}</h1>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated
                ? <WrappedComponent {...props}/>
                : <div><h1>You are not authenticated. Please log in</h1></div>
            }
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)
const AuthenticatedInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} day="Thurs" info="pineapple"/>, document.getElementById('app'))

// Just change isAuthenticated below to true / false to see the effect
ReactDOM.render(<AuthenticatedInfo isAuthenticated={false} day="Monday" info="banana"/>, document.getElementById('app'))
