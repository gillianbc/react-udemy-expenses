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
    </div>
)

// a function that returns a stateless functional component
// We have to spread the props to pass them down
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            <h1>The information here is from the Higher Order Component</h1>
            <WrappedComponent {...props}/>
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)

ReactDOM.render(<AdminInfo info="pineapple"/>, document.getElementById('app'))
