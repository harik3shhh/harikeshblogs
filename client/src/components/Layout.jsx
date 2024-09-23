// Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="lg:w-4/5 w-full md:w-full mx-auto p-2">
        {children}
      </div>
    </div>
  );
};

export default Layout;
