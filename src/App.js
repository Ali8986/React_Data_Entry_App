import "./App.css";
import React, { useState } from "react";
import FormEditingPage from "./components/editingForm";
import UserForm from "./components/form";
import { UserContext, UserCard } from "./components/DefaultUSerData";
import Home from "./components/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [userDetails, setUserdetails] = useState([]);
  const [cards, setCards] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      status: "active",
      id: new Date().getTime().toString(),
    },
  ]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/form",
      element: <UserForm />,
    },
    {
      path: "/FormEditingPage",
      element: <FormEditingPage />,
    },
  ]);

  return (
    <div className="App">
      <UserCard.Provider value={[cards, setCards]}>
        <UserContext.Provider value={[userDetails, setUserdetails]}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </UserCard.Provider>
    </div>
  );
}

export default App;
