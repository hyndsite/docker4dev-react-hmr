"use strict";

import React, { PropTypes }      from "react";
import HeaderSiteNav             from "./headerSiteNavComponent";

const Header = () => {
    return (
        <nav className="header-nav-container">
            <HeaderSiteNav />
        </nav>
    )
};

Header.propTypes = {
    user: PropTypes.object,
};

export default Header;

