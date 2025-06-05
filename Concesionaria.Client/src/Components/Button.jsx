// import '../Styles/Button.css'

const Button = (props) => {
    return (
        <button {...props}>
            {props.children}
        </button>
    );
}

export default Button;