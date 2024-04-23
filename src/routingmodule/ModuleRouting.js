import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import CreateUser from '../Components/CreateUser';
import ViewAllUsers from "../Components/ViewAllUsers";
const LazyCreateUserComponent = lazy(() => import("../Components/CreateUser"));

// Add the lazy-loaded component
const ModuleRouting = () => {
  return (
    <Routes>
      <Route
        path="/create"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LazyCreateUserComponent />
          </Suspense>
        }
      />
      <Route path="/view" element={<ViewAllUsers />} />
    </Routes>
  );
};

export default ModuleRouting;
