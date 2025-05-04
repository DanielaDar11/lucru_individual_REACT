import React from "react";
import styles from "./CuvantAfisat.module.css";

const CuvantAfisat = ({ cuvantSelectat, litereGhicite }) => {
  return (
    <div className={styles.afisareCuvant}>
      {cuvantSelectat.split("").map((litera, index) => (
        <span key={index}>{litereGhicite.includes(litera) ? litera : "_"}</span>
      ))}
    </div>
  );
};

export default CuvantAfisat;
