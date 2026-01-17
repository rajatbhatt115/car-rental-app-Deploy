import React from 'react';
import BlogDetailsPage from '../components/BlogDetailsPage';
import { useParams } from 'react-router-dom';
import ContactSection from '../components/common/ContactSection';

const BlogDetails = () => {
  const { id } = useParams();
  return (
    <>
      <BlogDetailsPage blogId={id} />
      <ContactSection />
    </>
  );
};

export default BlogDetails;