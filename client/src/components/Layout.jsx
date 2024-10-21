import React from 'react';
import { Helmet } from "react-helmet";

const Layout = ({
  children,
  title = "HOME - Travel and Technology",
  description = "Publishing blogs related to travel, technology and more",
  keywords = "blog, travel, technology, tech, tourism, hindi blogs, techie",
  author = "sagar"
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <div className="flex justify-center">
        <div className="lg:w-4/5 w-full md:w-full mx-auto p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
