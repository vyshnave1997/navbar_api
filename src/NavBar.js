import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const UserNavBar = () => {
  const [user, setUser] = useState({ name: "", avatar: "" });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Fetch a user from JSONPlaceholder API
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        const userData = response.data;
        setUser({
          name: userData.name,
          avatar: `https://robohash.org/${userData.username}.png?size=50x50`,
        });
      })
      .catch((error) => {
        console.error("Error fetching the user:", error);
      });
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={`user-nav-bar ${isDarkTheme ? "dark" : "light"}`}>
      <div className="nav-item logo">MyApp</div>
      <button className="nav-toggle" onClick={toggleNav}>
        ☰
      </button>
      <ul className={`nav-list ${isNavOpen ? "open" : ""}`}>
        <li className="nav-item">
          <a href="#home">Home</a>
        </li>
        <li className="nav-item">
          <a href="#about">About</a>
        </li>
        <li className="nav-item">
          <a href="#services">Services</a>
        </li>
        <li className="nav-item">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="nav-item user-info">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <span className="user-name">{user.name}</span>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkTheme ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default UserNavBar;
