import styles from "../styles/components/SignUp.module.css";
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
			},
		});
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
						<div className={styles["input-group"]}>
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
							className={styles.button}
						>
							{isLoading ? <Spinner size="sm" /> : "Create account"}
						</button>

						{isError ? (
							<p className={styles["error-text"]}>{error?.message}</p>
						) : null}
					</form>
				)}
			</div>

			<p className={styles.text}>
				Already have an account?{" "}
				<Link to="/sign-in" className={styles.link}>
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
