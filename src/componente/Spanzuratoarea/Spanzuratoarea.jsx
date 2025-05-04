import React, { useState, useEffect } from "react";
import cuvinte from "../../constants/cuvinte";
import SpDesen from "../SpDesen/SpDesen";
import AfisareCuvant from "../CuvantAfisat/CuvantAfisat";
import Tastatura from "../Tastatura/Tastatura";
import styles from "./Spanzuratoarea.module.css";
import Scor from "../Scor/Scor";
import IstoricCuvinte from "../IstoricCuvinte/IstoricCuvinte";
import {
  stergeScorurileSalvate,
  salveazaInLocalStorage,
} from "../../utils/localStorage";

const max_gresite = 7;
const max_jocuri = 3;

const Spanzuratoarea = ({ nume, timpLimita }) => {
  const [cuvantSelectat, setCuvantSelectat] = useState("");
  const [litereGhicite, setLitereGhicite] = useState([]);
  const [greseli, setGreseli] = useState(0);
  const [statusJoc, setStatusJoc] = useState("in_desfasurare");
  const [mesaj, setMesaj] = useState("");
  const [timpRamas, setTimpRamas] = useState(
    timpLimita === "nelimitat" ? null : parseInt(timpLimita)
  );
  const [jocuriJucate, setJocuriJucate] = useState(0);
  const [scor, setScor] = useState(0);
  const [istoricCuvinte, setIstoricCuvinte] = useState([]);

  const initJoc = () => {
    const cuvantRandom = cuvinte[Math.floor(Math.random() * cuvinte.length)];
    setCuvantSelectat(cuvantRandom);
    setLitereGhicite([]);
    setGreseli(0);
    setStatusJoc("in_desfasurare");
    setMesaj("");
    if (timpLimita !== "nelimitat") {
      setTimpRamas(parseInt(timpLimita));
    }
  };

  useEffect(() => {
    if (cuvantSelectat && statusJoc === "in_desfasurare") {
      const castigat = cuvantSelectat
        .split("")
        .every((litera) => litereGhicite.includes(litera));

      if (castigat) {
        const scorNou = scor + 1;
        const jocuri = jocuriJucate + 1;
        setStatusJoc("castigat");
        setMesaj(`Felicitari, ${nume}! Ai castigat! 🎉`);
        setScor(scorNou);
        setJocuriJucate(jocuri);
        setIstoricCuvinte((prevIstoric) => [
          ...prevIstoric,
          { cuvant: cuvantSelectat, corect: true },
        ]);

        if (jocuri >= max_jocuri) {
          salveazaInLocalStorage(nume, scorNou, [
            ...istoricCuvinte,
            { cuvant: cuvantSelectat, corect: true },
          ]);
        }

        if (jocuri < max_jocuri) {
          setTimeout(() => initJoc(), 2000);
        }
      } else if (greseli >= max_gresite) {
        const jocuri = jocuriJucate + 1;
        setStatusJoc("pierdut");
        setMesaj(`Ai pierdut, ${nume}! Cuvantul era: ${cuvantSelectat}`);
        setIstoricCuvinte((prevIstoric) => [
          ...prevIstoric,
          { cuvant: cuvantSelectat, corect: false },
        ]);

        if (jocuri >= max_jocuri) {
          salveazaInLocalStorage(nume, scor, [
            ...istoricCuvinte,
            { cuvant: cuvantSelectat, corect: false },
          ]);
        }

        setJocuriJucate(jocuri);
        if (jocuri < max_jocuri) {
          setTimeout(() => initJoc(), 2000);
        }
      }
    }
  }, [litereGhicite, greseli, cuvantSelectat, statusJoc, nume]);

  useEffect(() => {
    if (statusJoc === "in_desfasurare") {
      if (timpRamas === 0) {
        const jocuri = jocuriJucate + 1;
        setStatusJoc("pierdut");
        setMesaj(`Timpul a expirat, ${nume}! Cuvantul era: ${cuvantSelectat}`);
        setIstoricCuvinte((prevIstoric) => [
          ...prevIstoric,
          { cuvant: cuvantSelectat, corect: false },
        ]);
        salveazaInLocalStorage(nume, scor, [
          ...istoricCuvinte,
          { cuvant: cuvantSelectat, corect: false },
        ]);
        setJocuriJucate(jocuri);
        if (jocuri < max_jocuri) {
          setTimeout(() => initJoc(), 4000);
        }
      } else if (timpRamas !== null) {
        const timer = setTimeout(() => {
          setTimpRamas((t) => t - 1);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [timpRamas, statusJoc, nume, cuvantSelectat]);

  const ghicesteLitera = (litera) => {
    if (statusJoc !== "in_desfasurare" || litereGhicite.includes(litera))
      return;

    const noiLitere = [...litereGhicite, litera];
    setLitereGhicite(noiLitere);

    if (!cuvantSelectat.includes(litera)) {
      setGreseli(greseli + 1);
    }
  };

  useEffect(() => {
    initJoc();
  }, []);

  const joacaDinNou = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.containerSpanzuratoare}>
      <h1>Spânzurătoarea</h1>
      <p className={styles.numeJucator}>
        Jucator: <strong>{nume}</strong>
      </p>
      <p className={styles.scor}>Scor: {scor}</p>
      <p className={styles.jocuri}>
        Jocuri jucate: {jocuriJucate} / {max_jocuri}
      </p>
      {statusJoc === "in_desfasurare" && timpRamas !== null && (
        <p className={styles.timer}>Timp ramas: {timpRamas} secunde</p>
      )}
      {statusJoc === "in_desfasurare" && (
        <div className={styles.infoJoc}>
          <p>
            Greșeli: {greseli} / {max_gresite}
          </p>
        </div>
      )}
      <IstoricCuvinte istoric={istoricCuvinte} />

      {jocuriJucate < max_jocuri && (
        <>
          <SpDesen greseli={greseli} />
          <AfisareCuvant
            cuvantSelectat={cuvantSelectat}
            litereGhicite={litereGhicite}
          />
          {mesaj && (
            <div className={`${styles.mesaj} ${styles[statusJoc]}`}>
              {mesaj}
            </div>
          )}
          <Tastatura
            litereGhicite={litereGhicite}
            ghicesteLitera={ghicesteLitera}
            statusJoc={statusJoc}
            cuvantSelectat={cuvantSelectat}
          />
        </>
      )}

      {jocuriJucate >= max_jocuri && (
        <div>
          <Scor />
          <button
            onClick={stergeScorurileSalvate}
            className={styles.butonStergeScoruri}
          >
            Șterge scoruri
          </button>
          <button onClick={joacaDinNou} className={styles.butonJoacaDinNou}>
            Joacă din nou
          </button>
        </div>
      )}
    </div>
  );
};

export default Spanzuratoarea;
