// Stateless functional component
import { Link } from "react-router-dom";
import React from "react";

// The link here is client-side routing.  If we had used <a href="/">Go home</a> it would have been server-side routing
const NotFoundPage = () => (
  <div>
    Page not found 404 - <Link to="/">Go to the home page</Link>
  </div> )

export default NotFoundPage