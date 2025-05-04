import React from "react";
import styles from "./DetaliiScor.module.css";

const DetaliiScor = ({ istoricCuvinte }) => {
  return (
    <ul className={styles.detaliiScor}>
      {istoricCuvinte.map((item, idx) => (
        <li
          key={idx}
          className={`${styles.detaliiItem} ${
            item.corect ? styles.corect : styles.gresit
          }`}
        >
          {item.cuvant} - {item.corect ? "Corect" : "Greșit"}
        </li>
      ))}
    </ul>
  );
};

export default DetaliiScor;
