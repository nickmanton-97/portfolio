import Divider from '../misc/divider/Divider';
import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <Divider start="top 95%" />
      <div className={styles.footerContainer}>
        <div className={styles.columnOne}>
          <p>©2025 Nick Manton</p>
        </div>

        <div className={styles.columnTwo}>
          <ul>
            <li>Follow</li>
            <li>
              <a
                href="https://www.linkedin.com/in/nick-manton-5400561a0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nickmanton-97"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.columnThree}>
          <ul>
            <li>Contact</li>
            <li>
              <a href="mailto:mantonnick@outlook.com">mantonnick@outlook.com</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
