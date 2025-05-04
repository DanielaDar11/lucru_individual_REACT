import styles from "./IstoricCuvinte.module.css";

const IstoricCuvinte = ({ istoric }) => (
  <div className={styles.istoricCuvinte}>
    <h2 className={styles.titlu}>Răspunsuri:</h2>
    {istoric.map((item, index) => (
      <p
        key={index}
        className={`${styles.raspuns} ${
          item.corect ? styles.corect : styles.gresit
        }`}
      >
        {item.cuvant} - {item.corect ? "Ghicit corect!" : "Nu ai ghicit!"}
      </p>
    ))}
  </div>
);

export default IstoricCuvinte;
