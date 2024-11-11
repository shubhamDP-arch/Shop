import React,{useState,useEffect} from "react";
import'/styles/Navbar.css'
import '/styles/HomePage.css'
import SideBar from "./SideBar";
import Card from "./Card";
function HomePage(){
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

       // Hook to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);


    return(<div>
         <nav className="navbar">
    <div className="logo"><img src="/public/seld.png" alt="logo" /></div>
    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
      <li><a href="#">Shop</a></li>
      <li><a href="#">Items</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Logout</a></li>
      <li><div className="profile-icon">
        <i className="fas fa-user-circle"></i>
      </div></li>
    </ul>
    <div className="toggle-button" onClick={toggleSidebar}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
    
  </nav>
  <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  
  <div className="Stage">
  <Card />
  <Card />
    </div>
    </div>

  
);
}
export default HomePage;