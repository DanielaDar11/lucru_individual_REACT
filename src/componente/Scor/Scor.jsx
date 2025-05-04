import React, { useState, useEffect } from "react";
import styles from "./Scor.module.css";
import DetaliiScor from "./Detalii/DetaliiScor";

const Scor = () => {
  const [scoruriSalvate, setScoruriSalvate] = useState([]);
  const [detaliiVisible, setDetaliiVisible] = useState(null);

  useEffect(() => {
    const scoruri = JSON.parse(localStorage.getItem("scoruriSalvate") || "[]");
    setScoruriSalvate(scoruri);
  }, []);

  const toggleDetalii = (index) => {
    setDetaliiVisible(detaliiVisible === index ? null : index);
  };

  return (
    <div className={styles.containerScor}>
      <h2>Scoruri Salvate</h2>
      <ul className={styles.listaScoruri}>
        {scoruriSalvate.map((scor, index) => (
          <li key={index} className={styles.scor}>
            <p>
              <strong>{scor.nume}</strong>: {scor.scor} puncte
            </p>
            <button
              className={styles.butonDetalii}
              onClick={() => toggleDetalii(index)}
            >
              Detalii
            </button>
            {detaliiVisible === index && scor.istoricCuvinte && (
              <DetaliiScor istoricCuvinte={scor.istoricCuvinte} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scor;
