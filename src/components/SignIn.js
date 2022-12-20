import "../styles/components/SignIn.css";
import logo from "../styles/logo.jpg"
import { useSignInEmailPassword } from "@nhost/react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Input from "./Input";
import Spinner from "./Spinner";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [canteenEmail, setcanteenEmail] = useState("");

	const {
		signInEmailPassword,
		isLoading,
		isSuccess,
		needsEmailVerification,
		isError,
		error,
	} = useSignInEmailPassword();

	const handleOnSubmitStudent = async (e) => {
		e.preventDefault();
		signInEmailPassword(email, password);
	};


	if (isSuccess) {
		return <Navigate to="/" replace={true} />;
	}


	const disableForm = isLoading || needsEmailVerification;
	return (
		<div className="container">
			<div className="card">
				<div className="logo-wrapper">
					<img src={logo} alt="logo" />
				</div>

				{needsEmailVerification ? (
					<p className="verification-text">
						Please check your mailbox and follow the verification link to verify
						your email.
					</p>
				) : (<div className="form-div">

					<form id="studentForm" onSubmit={handleOnSubmitStudent} className="form">
						<Input
							type="email"

							label="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={disableForm}
							required
						/>
						<Input
							type="password"
							label="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={disableForm}
							required
						/>

						<button
							type="submit"
							disabled={disableForm}
							className="button"
						>
							{isLoading ? <Spinner size="sm" /> : "Sign in"}
						</button>

						{isError ? (
							<p className="error-text">{error?.message}</p>
						) : null}
					</form>
				</div>
				)}
			</div>

			<p className="text">
				No account yet?{" "}
				<Link to="/sign-up" className="link">
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default SignIn;
