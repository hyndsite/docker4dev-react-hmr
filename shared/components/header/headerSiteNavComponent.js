"use strict";

import React                    from "react";
import { Link, IndexLink }      from "react-router";

const HeaderSiteNav = () => {
    return (
        <ul>
            <li className="header-brand"><IndexLink to="timeline">DEMO</IndexLink></li>
            <li className="header-nav_item"><Link to="timeline" activeClassName="header-active-link">Timeline</Link></li>
            <li className="header-nav_item"><Link to="about" activeClassName="header-active-link">About</Link></li>
        </ul>
    )
};

export default HeaderSiteNav;