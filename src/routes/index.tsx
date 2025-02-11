import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PrivateRoute from '../components/PrivateRoute';

// Lazy load pages
const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const SpotDetails = React.lazy(() => import('../pages/SpotDetails'));
const ExploreSpots = React.lazy(() => import('../pages/ExploreSpots'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const ListSpot = React.lazy(() => import('../pages/ListSpot'));
const HostDashboard = React.lazy(() => import('../pages/HostDashboard'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreSpots />} />
        <Route path="/spots/:id" element={<SpotDetails />} />
        
        {/* Protected Routes */}
        <Route
          path="/list-spot"
          element={
            <PrivateRoute roles={['host']}>
              <ListSpot />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={['host']}>
              <HostDashboard />
            </PrivateRoute>
          }
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;