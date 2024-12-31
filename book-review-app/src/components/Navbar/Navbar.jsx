import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar component that renders a navigation bar with a title and a dropdown menu.
 * The dropdown menu toggles open and closed when the menu icon is clicked.
 * The dropdown closes if a click is detected outside the menu.
 * 
 * @returns {JSX.Element} The JSX structure representing the navigation bar with the dropdown menu.
 */
const Navbar = () => {
    // State to track whether the dropdown menu is open or closed
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Ref to track the dropdown menu element for detecting clicks outside it
    const dropdownRef = useRef(null);

    // Function to toggle the dropdown menu's visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Effect hook to handle click outside the dropdown to close it
    useEffect(() => {
        // Event listener to detect clicks outside the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Close the dropdown if click happens outside the menu
                setIsDropdownOpen(false);
            }
        };

        // Add the event listener for detecting outside clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]); // Re-run effect when dropdownRef changes

    return (
        <div className="navbar">
            {/* Navigation bar title container */}
            <div className='nav-title-container'>
                {/* The logo link, which directs to the homepage */}
                <Link to="/" className='nav-title'>Book Review</Link>
            </div >

            {/* Dropdown menu container */}
            <div ref={dropdownRef}>
                {/* Menu icon that triggers the dropdown */}
                <img
                    className="menu-logo"
                    src={`/menu.png`}  // Use absolute path to the menu image
                    alt="Menu"
                    onClick={toggleDropdown}  // Trigger the toggle function when clicked
                />

                {/* Dropdown menu, which conditionally applies 'show' class based on the isDropdownOpen state */}
                <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    {/* Link elements for navigation */}
                    <Link onClick={toggleDropdown} to="/">Home</Link>
                    <Link onClick={toggleDropdown} to="/display-books">Display Books</Link>
                    <Link onClick={toggleDropdown} to="/add-book">Add Book</Link>
                    <Link onClick={toggleDropdown} to="/about-us">About Us</Link>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
