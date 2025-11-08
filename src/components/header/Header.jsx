import styles from "./header.module.css";

function Header() {

  return (
    <>
      <div className={styles.heroContainer}>
        <h1>I’m a designer and front-end developer building design-led digital experiences, from concept to code.</h1>
      </div>
      <div className={styles.recentWork}>
        <p>Recent work ↴</p>
      </div>

    </>
  )
}

export default Header
