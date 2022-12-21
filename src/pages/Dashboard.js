import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Canteen from "./Canteen";
import Student from "./Student";
import { gql, useQuery } from "@apollo/client";

const check_canteen_user = gql`
query canteenUser($email: String) {
	canteen_email(where: {owner_email: {_eq: $email}}){
	  owner_email
	}
  }  
`

const Dashboard = () => {

	const [email, setEmail] = useState("");
	const { user } = useOutletContext();
	useEffect(() => {
		setEmail(user.email); // eslint-disable-next-line
	}, []);

	const { data, loading, error } = useQuery(check_canteen_user, { variables: { email } });

	if (loading) return "Loading..";
	if (error) return `Error! ${error.message}`
	else {
		console.log(data);
		if (data.canteen_email[0].owner_email == email) {
			return <Canteen />
		}
		else {
			return <Student />
		}
	}
};

export default Dashboard;