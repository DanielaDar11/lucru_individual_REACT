import React from "react";
import styles from "./Tastatura.module.css";

const Tastatura = ({
  litereGhicite,
  ghicesteLitera,
  statusJoc,
  cuvantSelectat,
}) => {
  const litere = "AĂÂBCDEFGHIÎJKLMNOPQRSȘȚTUVWXYZ".split("");

  return (
    <div className={styles.tastatura}>
      {litere.map((litera) => {
        const esteGhicita = litereGhicite.includes(litera);
        const esteCorecta = cuvantSelectat.includes(litera);
        const clasaLitera = esteGhicita
          ? esteCorecta
            ? styles.corect
            : styles.gresit
          : "";

        return (
          <button
            key={litera}
            onClick={() => ghicesteLitera(litera)}
            disabled={esteGhicita || statusJoc !== "in_desfasurare"}
            className={`${styles.butonTastatura} ${clasaLitera}`}
          >
            {litera}
          </button>
        );
      })}
    </div>
  );
};

export default Tastatura;
