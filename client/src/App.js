import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NhostClient, NhostReactProvider, useUserEmail, useUserId } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { useUserData } from '@nhost/react'

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Canteen from "./pages/Canteen";

const nhost = new NhostClient({
	subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
	region: process.env.REACT_APP_NHOST_REGION,
});

function App() {

	const user = useUserData()

	return (
		<NhostReactProvider nhost={nhost}>
			<NhostApolloProvider nhost={nhost}>
				<BrowserRouter>
					<Routes>
						<Route path="sign-up" element={<SignUp />} />
						<Route path="sign-in" element={<SignIn />} />
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Layout />
								</ProtectedRoute>
							}
						>
							<Route index element={(user.email==="muskangarg02270@gmail.com")?<Canteen/>:<Dashboard />}/>
							<Route path="profile" element={<Profile />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</NhostApolloProvider>
			<Toaster />
		</NhostReactProvider>
	);
}

export default App;
