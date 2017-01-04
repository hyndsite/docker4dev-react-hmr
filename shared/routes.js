import React                    from "react";
import { Route, IndexRoute }    from "react-router";
import App                      from "./components/index";
import About                    from "./components/about/about";
import TimelineContainer        from "./components/timeline/timelineContainer";
import NotFoundPage             from "./components/common/notFoundPage";

export default (
    <Route component={App} path="/">
        <IndexRoute component={TimelineContainer}/>
        <Route path="about" component={About} />
        <Route path="timeline" component={TimelineContainer}>
            <Route path=":event" component={TimelineContainer} />
        </Route>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
