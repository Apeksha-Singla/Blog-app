// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // Make sure to import your CSS file

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);

  const handleAddBlog = async (event) => {
    event.preventDefault();
    // Add your logic for handling the blog submission using axios
    // Example: axios.post('/addBlog', formData);
    document.getElementById("blogForm").style.display = "none";
    // Optionally, you can call showBlogs here to refresh the blog list after adding a new blog
  };

  const handleShowPopup = () => {
    document.getElementById("blogForm").style.display = "flex";
  };

  const handleClosePopup = () => {
    document.getElementById("blogForm").style.display = "none";
  };

  const showBlogs = async () => {
    try {
      const response = await axios('/getBlogs');
      const blogsData = response.data;
      const pendingBlogs = blogsData.filter(blog => blog.status === "Pending");
      setBlogs(pendingBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  const approveBlog = async (blogId) => {
    try {
      await axios.get(`/approveBlog/${blogId}`);
      reloadPage();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectBlog = async (blogId) => {
    try {
      await axios.get(`/rejectBlog/${blogId}`);
      reloadPage();
    } catch (error) {
      console.error(error);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    showBlogs();
  }, []); // Run showBlogs on component mount

  return (
    <div className="logo">
      <h1><strong>Blogify</strong></h1>
      <button id="showPopupButton" onClick={handleShowPopup}>Add Blog</button>
      <a href="/logout" className="logo1"><img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="profile" /></a>
      <h3>Admin</h3>

      <form id="blogForm" onSubmit={handleAddBlog}>
        {/* ... (your existing form code) */}
      </form>

      <div id="addApproval">
        <h1>Admin Dashboard</h1>
        {blogs.map(blog => (
          <div key={blog._id} className="blog">
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            <p>{blog.category}</p>
            <button type="button" className="approve" onClick={() => approveBlog(blog._id)}>Approve</button>
            <button type="button" className="reject" onClick={() => rejectBlog(blog._id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
