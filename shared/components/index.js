import React, {PropTypes} from "react";
import Header from "./header/headerContainer";
import Footer from "./footer/footerContainer";

class App extends React.Component {

    render() {
        return (
            <div className="site-view">
                <header className="header">
                    <Header />
                </header>
                <main className="main">
                    {this.props.children}
                </main>
                <footer className="footer">
                    <Footer />
                </footer>

            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;