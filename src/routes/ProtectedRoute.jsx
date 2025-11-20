import propTypes from 'prop-types';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from "@/contexts/AuthContextProvider"; // adjust the path according to your file structure

function ProtectedRoute({ Component, path }) {
  const { isLoggedIn } = React.useContext(AuthContext);

  return isLoggedIn ? (
    <Routes>
      <Route element={<Component />} path={path} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  Component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
