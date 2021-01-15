import Draggable from "components/Draggable";

import "./styles.scss";

const Login: React.FC = () => {
	return (
		<div className='login d-flex justify-center align-center flex-column'>
			<h1>Login</h1>

			<Draggable />
		</div>
	);
};

export default Login;
