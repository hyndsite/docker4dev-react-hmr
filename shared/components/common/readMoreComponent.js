"use strict";

import React                    from "react";
import { Link }                 from "react-router";



const ReadMoreComponent = ({text, url}) => {

    return (
        <span>
            <span>{text}</span><Link to={url}>...read more</Link>
        </span>
    )
};

export default ReadMoreComponent;