import './MenuItem.css';
// Import the useNavigate hook from 'react-router-dom' to programmatically navigate to different routes.
import { useNavigate } from 'react-router-dom';

/**
 * MenuItem component that represents a clickable item in a menu.
 * Each menu item includes an image and a label. When clicked, the user is navigated 
 * to the path specified in the `item` prop.
 * 
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.item - The item data for the menu item.
 * @param {string} props.item.path - The path to navigate to when the item is clicked.
 * @param {string} props.item.image - The URL or path to the image to display in the menu item.
 * @param {string} props.item.label - The label text to display for the menu item.
 * 
 * @returns {JSX.Element} A JSX element that represents a single menu item.
 */
const MenuItem = ({ item }) => {

    // Initialize the navigate function to programmatically navigate to different routes
    const navigate = useNavigate();

    return (
        // The div is the clickable menu item; it uses 'onClick' to trigger navigation
        <div key={item.path} className="menu-item" onClick={() => navigate(item.path)}>
            {/* Image displayed for the menu item, using the 'item.image' prop for the source */}
            <img className="menu-image" src={item.image} alt={item.label} />
            {/* The label of the menu item, displayed inside an h2 tag */}
            <h2 className="menu-text">{item.label}</h2>
        </div>
    );
};

export default MenuItem;