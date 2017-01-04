"use strict";

import React            from "react";
import {Link}           from "react-router";

const NotFoundPage = () => {
    return (
        <div className="centered">
            <h1>404: Page Not Found</h1>
            <p>You reached a page that is no longer
                in service. If you believe you reached in Error
                please disconnect and retry the page again.</p>

            <p><Link to="/">Hang-up and try your page again!</Link></p>
        </div>
    );
};
export default NotFoundPage;