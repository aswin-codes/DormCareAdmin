import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LaundryList from "./components/LaundryList";
import LaundryForm from "./components/LaundryForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <nav className="bg-gray-700 px-5 py-5">
      <h1 className="text-white font-semibold text-2xl">DormCare</h1>
    </nav>
    <main className="px-10">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-2 lg:col-span-3">
          <LaundryList />
        </div>
        <div className="lg:col-span-2">
          <LaundryForm />
        </div>
      </div>
      </main>
    </>
  );
}

export default App;
