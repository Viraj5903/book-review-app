import './HeroSection.css';

/**
 * HeroSection component that renders a hero banner with a background image
 * and an overlay containing a text title. The text title is customizable 
 * via the `heroText` prop.
 * 
 * @param {Object} props - The properties passed to this component.
 * @param {string} props.heroText - The text content to display in the hero banner.
 * 
 * @returns {JSX.Element} A JSX element that represents the hero section of the page.
 */
const HeroSection = ({ heroText }) => {
    return (
        <div className="hero-section">
            {/* Background image for the hero section. The image is set with a relative path */}
            <img className="background-image" src="/Hogwarts.png" alt="Main Background" />

            {/* Overlay div that sits on top of the background image to allow text visibility */}
            <div className="overlay">
                {/* The title text passed through the `hero_text` prop */}
                <h1 className="hero-text">{heroText}</h1>
            </div>
        </div>
    );
};

export default HeroSection;
