import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Canteen from "./Canteen";
import Student from "./Student";
const Dashboard = () => {
	const [email, setEmail] = useState("");
	const { user } = useOutletContext();
	useEffect(() => {
		setEmail(user.email);
	}, []);
	// adityasingla.2802@gmail.com
	return email === "muskangarg02270@gmail.com" ? <Student /> : <Canteen />;
};

export default Dashboard;
