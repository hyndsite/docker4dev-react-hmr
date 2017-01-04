"use strict";

import React                    from "react";
import { Link }      from "react-router";

const NavLinksComponent = () => {

    return (
        <ul>
            <li><Link to="timeline">Timeline</Link></li>
            <li><Link to="about" >About</Link></li>
        </ul>
    )
};

export default NavLinksComponent;