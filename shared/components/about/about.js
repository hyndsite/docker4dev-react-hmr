"use strict";

import React        from "react";
import * as info    from "../../constants/applicationInfo";

export default class About extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="about primary-bkgd">
                    <h1>Hello</h1>
                    <p>{info.AboutText}</p>
                </div>
            </div>
        );
    }
}
