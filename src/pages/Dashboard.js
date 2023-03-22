import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const check_canteen_user = gql`
query canteenUser($email: citext) {
	canteen_email(where: {owner_email: {_eq: $email}}){
	  owner_email
	}
  }  
`

const Dashboard = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const { user } = useOutletContext();

	useEffect(() => {
		setEmail(user.email); // eslint-disable-next-line
	}, []);

	const { data, loading, error } = useQuery(check_canteen_user, { variables: { email } });

	const check = () => {
		if (data.canteen_email.length === 0) {
			navigate("/canteens");
		}
		else {
			navigate("/canteen");
		}
	}

	if (loading) return "Loading..";
	if (error) return `Error! ${error.message}`
	else {
		return (
			<div>
				{check()}
			</div>
		)
	}
};

export default Dashboard;