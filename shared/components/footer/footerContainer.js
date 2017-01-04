"use strict";

import React, {PropTypes, Component}                from "react";
import NavLinksComponent                           from "../common/navLinksComponent";
import ReadMoreComponent                            from "../common/readMoreComponent";
import SocialNavComponent                           from "../common/socialNavComponent";
import * as info                                    from "../../constants/applicationInfo"
import {getPercentageOfTextRoundedToNextFullWord}   from "../../lib/utility";

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer_sections">
                <div className="footer_nav">
                    <h4>// Links</h4>
                    <NavLinksComponent/>
                </div>
                <div className="footer_social-nav">
                    <h4>// Social</h4>
                    <SocialNavComponent/>
                    <div className="parent-brand">
                        <a className="lockmedown" href="https://lockmedown.com">LockMeDown.com</a>
                    </div>
                </div>
                <div className="footer_about-info">
                    <h4>// Hackers Hall</h4>
                    <ReadMoreComponent
                        text={getPercentageOfTextRoundedToNextFullWord(info.AboutText, 35)}
                        url="about"
                    />
                </div>
            </div>
        )
    }
}

export default Footer;