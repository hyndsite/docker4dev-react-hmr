import React, {PropTypes, Component}            from "react";

class TextInput extends Component {

// inspiration: Cory House
    render() {
        let wrapperClass = "form-group";
        if (error && error.length > 0) {
            wrapperClass = `${wrapperClass} has-error"`;
        }
        const {name, label, placeholder, value, error, onChange, tabOrder, type="text"} = this.props;

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{label}</label>
                <div>
                    <input
                        type={type}
                        name={name}
                        className="form-control"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        ref={name}
                        tabIndex={tabOrder}
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        )
    }
}

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    refName: PropTypes.string
};

export default TextInput;