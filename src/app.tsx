import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "@/layouts/header";
import Home from "@/pages/home";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}
