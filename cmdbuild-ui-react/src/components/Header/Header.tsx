import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../state/AppContext';
import styles from './Header.module.css';

// Import icons from a library like react-icons
import { FaCog, FaBell, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { mainState } = useAppContext();
  const navigate = useNavigate();

  // Logic from the 'headercontroller.js'
  const handleLogout = () => {
    // Here you would call your authentication service to log out
    console.log('Logging out...');
    navigate('/login'); // Redirect to login page
  };
  
  // This replaces the 'bind: { hidden: '{!isAuthenticated}' }'
  if (!mainState.isUserAuthenticated) {
    return null; // Don't render the header if not authenticated
  }

  // Derived state (from 'headermodel.js')
  const isAdministrator = true; // Replace with real logic from context, e.g. mainState.session.rolePrivileges.admin_access
  const isAdministrationModule = mainState.isAdministrationModule;

  return (
    <header className={styles.header} data-testid="main-header-header">
      <div className={styles.logoContainer}>
        // Put your logo component or image here
        {/* <Logo className={styles.logo} /> */}
        <span className={styles.instanceName}>My Medical Inventory</span>
      </div>

      <div className={styles.fill}></div> {/* This is the 'tbfill' */}

      <div className={styles.actions}>
        {/* Conditional rendering replaces 'bind: { hidden: ... }' */}
        {isAdministrator && !isAdministrationModule && (
          <Link to="/administration/home" className={styles.iconButton} title="Administration Module">
            <FaCog />
          </Link>
        )}
        
        <button className={styles.iconButton} title="Notifications">
            <FaBell />
        </button>

        <button 
            className={styles.iconButton} 
            title="Logout" 
            onClick={handleLogout}
            data-testid="header-logout"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

export default Header;

/* Example CSS in Header.module.css */
/*
.header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border-bottom: 1px solid #555;
}
.logoContainer { ... }
.instanceName { ... }
.fill {
    flex-grow: 1;
}
.actions {
    display: flex;
    gap: 1rem;
}
.iconButton {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
}
*/