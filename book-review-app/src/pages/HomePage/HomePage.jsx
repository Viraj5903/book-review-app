import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import HeroSection from "../../components/HeroSection/HeroSection";
import MenuItem from "../../components/MenuItem/MenuItem";
import TopPickBookItem from "../../components/TopPickBookItem/TopPickBookItem";

/**
 * HomePage component that displays a hero section, navigation menu, and top book picks.
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = () => {
    const navigate = useNavigate();
    const [topPicks, setTopPicks] = useState([]);
    const [currentBooks, setCurrentBooks] = useState([0, 1]); // Show 2 books initially
    const apiKey = 'AIzaSyCWMKoPj4vLH_FSAMA8jQhwDQJ1FiMG-Ao'; // Replace with your Google API key

    /**
     * Fetch popular books based on a random genre.
     * This function fetches books from the Google Books API and sets them in the state.
     */
    useEffect(() => {
        const fetchPopularBooks = async () => {
            const genres = ['fantasy', 'magic', 'horror'];
            const randomGenre = genres[Math.floor(Math.random() * genres.length)];

            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=subject:${randomGenre}&orderBy=relevance&key=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }

                const data = await response.json();
                setTopPicks(data.items || []); // Fallback in case no books are returned
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchPopularBooks();
    }, [apiKey]);

    /**
     * Automatically cycles through the displayed books every 6 seconds.
     * It updates the currentBooks state to show different books.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBooks(([first, second]) => {
                const nextFirst = (first + 1) % topPicks.length;
                const nextSecond = (second + 1) % topPicks.length;
                return [nextFirst, nextSecond];
            });
        }, 6000); // Change every 6 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [topPicks]);

    // Menu items configuration
    const menuItems = [
        { path: "/display-books", image: "/viewbook.png", label: "Display Books" },
        { path: "/add-book", image: "/addbook.png", label: "Add Books" },
        { path: "/about-us", image: "/team.png", label: "About Us" }
    ];

    return (
        <div className="home-page">

            <HeroSection heroText="Welcome" />

            {/* Menu Section */}
            <div className="menu-section">
                {menuItems.map((item) => (
                    <MenuItem key={item.path} item={item} />
                ))}
            </div>

            {/* Top Picks Section */}
            <div className="top-picks-section">
                <h2>Top Picks for You</h2>
                <div className="top-picks-container">
                    {topPicks.length > 0 ? (
                        currentBooks.map((index) => (
                            <TopPickBookItem
                                key={topPicks[index].id}
                                book={topPicks[index]}
                                onClick={() => navigate(`/featured-book/${topPicks[index].id}`)}
                            />
                        ))
                    ) : (
                        <p>Loading top picks...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
