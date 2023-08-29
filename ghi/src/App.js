import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification.js";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PantryForm from "./PantryItem.js";
import ListRecipes from "./Recipes/Recipes.js";
import Nav from "./Nav.js";
import MainPage from "./MainPage.js";



function App() {
  // const [currentForm, setCurrentForm] = useState('login');
  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
          </Route>
          <Route path="/pantry">
            <Route index element={<PantryForm />} />
          </Route>
          <Route path="/recipes">
            <Route index element={<ListRecipes />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   const [launchInfo, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, []);

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launchInfo} />
//     </div>
//   );
// }

// export default App;
