import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import ProductDisplay from "../src/ProductDisplay";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Outlet />
          {/* <ProductDisplay /> */}
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
