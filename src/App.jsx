import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <nav>asdasdas</nav>
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
