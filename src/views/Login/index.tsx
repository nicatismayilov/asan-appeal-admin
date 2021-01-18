import BottomSheet from "components/BottomSheet";

import "./styles.scss";

const Login: React.FC = () => {
	return (
		<div className='login d-flex justify-center align-center flex-column'>
			<h1>Login</h1>

			<BottomSheet />
		</div>
	);
};

export default Login;
