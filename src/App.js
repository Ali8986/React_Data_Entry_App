import "./App.css";
import FormEditingPage from "./components/editingForm";
import UserForm from "./components/form";
import Home from "./components/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./components/DefaultUSerData";

function App() {
  // let data = JSON.parse(localStorage.getItem("Data"));

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
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
}

export default App;
