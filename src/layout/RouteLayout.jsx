import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from "../layout/AuthDataProvider";
import PageLayout from './PageLayout.jsx';


const RouteLayout = ({ component: Component, layout: Layout, ...rest }) => {
  const { authenticated } = useContext(AuthContext)

  Layout = Layout || PageLayout;

  if(authenticated){
    return (
      <Layout>
        <Component />
      </Layout>
    )
  } else {
    return (
      <Navigate to="/sign-in" />
    )
  }
};

export default RouteLayout;