import React from 'react';

import { AuthContext } from "../layout/AuthDataProvider";

const PageLayout = ({ children, ...rest }) => {
  const { clearStorage } = React.useContext(AuthContext);
  
  return (
    <div>
      <div>HEADER</div>
      <div style={{ padding: '15px' }}>{children}</div>
      <div>
        <a href={'/'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            clearStorage();
          }}
        >Logout</a>
      </div>
    </div>
  )
}

export default PageLayout;
