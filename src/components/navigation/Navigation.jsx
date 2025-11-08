import styles from "./navigation.module.css";

function Navigation() {

  return (
    <>
      <div className={styles.NavigationWrapper}>
        <nav className={styles.NavigationContainer}>
          <div className={styles.Logo}>
            <p className={styles.NickWordmark}>
              Nick Manton
            </p>
          </div>
          <div className={styles.NavigationItemsContainer}>
            <ul className={styles.NavigationItems}>
              <li>Work</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        </nav>

      </div>

    </>
  )
}

export default Navigation
