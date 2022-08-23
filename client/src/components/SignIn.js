import styles from "../styles/components/SignIn.module.css";

import { useSignInEmailPassword } from "@nhost/react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Input from "./Input";
import Spinner from "./Spinner";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const {
		signInEmailPassword,
		isLoading,
		isSuccess,
		needsEmailVerification,
		isError,
		error,
	} = useSignInEmailPassword();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		signInEmailPassword(email, password);
	};

	if (isSuccess) {
		return <Navigate to="/" replace={true} />;
	}

	const disableForm = isLoading || needsEmailVerification;
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles["logo-wrapper"]}>
					<img src={process.env.PUBLIC_URL + "logo.svg"} alt="logo" />
				</div>

				{needsEmailVerification ? (
					<p className={styles["verification-text"]}>
						Please check your mailbox and follow the verification link to verify
						your email.
					</p>
				) : (
					<form onSubmit={handleOnSubmit} className={styles.form}>
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
							className={styles.button}
						>
							{isLoading ? <Spinner size="sm" /> : "Sign in"}
						</button>

						{isError ? (
							<p className={styles["error-text"]}>{error?.message}</p>
						) : null}
					</form>
				)}
			</div>

			<p className={styles.text}>
				No account yet?{" "}
				<Link to="/sign-up" className={styles.link}>
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default SignIn;
