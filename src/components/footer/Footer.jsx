import Divider from '../misc/divider/Divider';
import styles from "./footer.module.css";

function Footer() {

  return (
    <>
      <Divider start="top 95%" />
      <div className={styles.footerContainer}>
        <div className={styles.columnOne}><p>©2025 Nick Manton</p></div>
        <div className={styles.columnTwo}>
          <ul>Follow
            <li>LinkedIn</li>
            <li>GitHub</li>
            </ul>
        </div>
           <div className={styles.columnThree}>
          <ul>Contact
            <li>mantonnick@outlook.com</li>
            <li>GitHub</li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default Footer
