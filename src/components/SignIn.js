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
	const handleOnSubmitCanteen = async (e) => {
		e.preventDefault();
	}

	if (isSuccess) {
		return <Navigate to="/" replace={true} />;
	}

	function studentButton() {
		const studentButton = document.getElementById("studentButton");
		const canteenButton = document.getElementById("canteenButton");
		studentButton.classList.add("btn-primary");
		studentButton.classList.remove("btn-outline-primary");
		canteenButton.classList.add("btn-outline-primary");
		canteenButton.classList.remove("btn-primary");
		document.getElementById("canteenForm").style.display = "none";
		document.getElementById("studentForm").style.display = "";

	}
	function canteenButton() {
		const studentButton = document.getElementById("studentButton");
		const canteenButton = document.getElementById("canteenButton");
		canteenButton.classList.add("btn-primary");
		canteenButton.classList.remove("btn-outline-primary");
		studentButton.classList.add("btn-outline-primary");
		studentButton.classList.remove("btn-primary");
		document.getElementById("studentForm").style.display = "none";
		document.getElementById("canteenForm").style.display = "block";
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
					<div className="button-div">
						<button id="studentButton" onClick={studentButton} className="btn btn-lg btn-primary navigation-button">Student</button>
						<button id="canteenButton" onClick={canteenButton} className="btn btn-lg btn-outline-primary navigation-button">Canteen</button>
					</div>
					{/* <div className="radio-button">

						<input onClick={studentButton} type="checkbox" name="student" id="student-signin" value="student" checked />
						<label for="student-login">Student</label>
						<input onClick={canteenButton} type="checkbox" name="canteen" id="canteen-signin" value="canteen" />
						<label for="canteen-login">Canteen</label>
					</div> */}
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
					<form id="canteenForm" onSubmit={handleOnSubmitCanteen} className="form">
						<Input
							type="email"

							label="Email address"
							value={canteenEmail}
							onChange={(e) => setcanteenEmail(e.target.value)}
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
