// import "./App.css";
// // import Create from "./Users/Create";
// import { Routes, Route } from "react-router-dom";
// import ViewAllUsers from "./Components/ViewAllUsers";
// import CreateUser from "./Components/CreateUser";
// // import Card  from './Components/CardComp';

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<CreateUser/>} />
//         <Route path="/view" element={<ViewAllUsers />} />
//         {/* <Route path="/create" element={<CreatePage />} /> */}
//         {/* <Route path="/card" element={<Card/>}/> */}
//       </Routes>
//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigateMain from "./Components/NavigateMain";
import CreateUser from "./Components/CreateUser";
import ModuleRouting from "./routingmodule/ModuleRouting";
import ViewAllUsers from "./Components/ViewAllUsers";

const App = () => {
  return (
    <Router>
      <div>
        <NavigateMain />
        <Routes>
          <Route path="/users/*" element={<ModuleRouting/>} />
          <Route path="/users/create" element={<CreateUser/>}></Route>
          <Route path="/" element={<Navigate to="/users/create" />} />
        </Routes>

        {/* <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="/view" element={<ViewAllUsers />} />
        </Routes> */}
      </div>
    </Router>
  );
};

export default App;
