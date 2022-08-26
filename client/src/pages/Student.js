import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../styles/pages/Student.module.css";
import { Helmet } from "react-helmet";

function Student() {
	const { user } = useOutletContext();
	return (
		<>
			<Helmet>
				<title>Dashboard - Nhost</title>
			</Helmet>

			<div>
				<h2 className={styles.title}>Dashboard</h2>

				<p className={styles["welcome-text"]}>
					Welcome, {user?.metadata?.firstName || "stranger"}{" "}
					<span role="img" alt="hello">
						👋
					</span>
				</p>

				<p className={styles["info-text"]}>
					Edit the <code>src/pages/Dashboard.js</code> file to populate this
					page.
				</p>
			</div>
		</>
	);
}

export default Student;
