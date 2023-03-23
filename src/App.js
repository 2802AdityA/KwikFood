import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Canteencards from "./pages/Canteencards";
import Student from "./pages/Student";
import Canteen from "./pages/Canteen";

import CanteenCurrentOrders from "./pages/CanteenCurrentOrders";
import Orders from "./pages/Orders";


const nhost = new NhostClient({
	subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
	region: process.env.REACT_APP_NHOST_REGION,
});

function App() {
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
							<Route index element={<Dashboard />} />

							<Route path="profile" element={<Profile />} />
							<Route path="canteens" Component={Canteencards} />
							<Route path="canteens/:canteenName" Component={Student} />
							<Route path="canteen" Component={Canteen} />

							<Route path="canteenorders" Component={CanteenCurrentOrders} />

							<Route path="orders" Component={Orders} />

						</Route>
					</Routes>
				</BrowserRouter>
			</NhostApolloProvider>
			<Toaster />
		</NhostReactProvider>
	);
}

export default App;
