import { Outlet } from 'react-router-dom';
import Header from './Header/Header'; // The translated header component
import styles from './MainLayout.module.css'; // For styling

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.mainContent}>
        {/* React Router will render the matching child route component here */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;

/* Example CSS in MainLayout.module.css */
/*
.mainLayout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.mainContent {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}
*/