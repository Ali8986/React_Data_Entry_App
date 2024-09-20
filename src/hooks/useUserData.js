import { useState } from "react";

const UseUserData = () => {
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
  // useEffect(() => {
  //   const savedData = JSON.parse(localStorage.getItem("Data"));
  //   if (savedData) {
  //     setUserdetails(savedData);
  //   }
  // }, []);
  return {
    userDetails,
    setUserdetails,
    cards,
    setCards,
  };
};

export default UseUserData;
