import "../styles/components/SignUp.css";


import { useSignUpEmailPassword } from "@nhost/react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Input from "./Input";
import Spinner from "./Spinner";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const {
		signUpEmailPassword,
		isLoading,
		isSuccess,
		needsEmailVerification,
		isError,
		error,
	} = useSignUpEmailPassword();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		signUpEmailPassword(email, password, {
			displayName: `${firstName} ${lastName}`.trim(),
			metadata: {
				firstName,
				lastName,
				email,
			},
		});
	};

	if (isSuccess) {
		return <Navigate to="/" replace={true} />;
	}

	const disableForm = isLoading || needsEmailVerification;

	return (
		<div className="container">
			<div className=" sign-up-card">
				<div className="logo-wrapper">
					<img src={process.env.PUBLIC_URL + "logo-form.png"} alt="logo" />
				</div>

				{needsEmailVerification ? (
					<p className="verification-text">
						Please check your mailbox and follow the verification link to verify
						your email.
					</p>
				) : (
					<form onSubmit={handleOnSubmit} className="form">
						<div className="input-group">
							<Input
								label="First name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								disabled={disableForm}
								required
							/>
							<Input
								label="Last name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								disabled={disableForm}
								required
							/>
						</div>
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
							label="Create password"
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
							{isLoading ? <Spinner size="sm" /> : "Create account"}
						</button>

						{isError ? (
							<p className="error-text">{error?.message}</p>
						) : null}
					</form>
				)}
			</div>

			<p className="text">
				Already have an account?{" "}
				<Link to="/sign-in" className="link">
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
