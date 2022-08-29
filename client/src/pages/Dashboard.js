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
	// const canteenEmail = "muskangarg02270@gmail.com";
	const canteenEmail = "adityasingla.2802@gmail.com";
	return email === canteenEmail ? <Student /> : <Canteen />;
};

export default Dashboard;
