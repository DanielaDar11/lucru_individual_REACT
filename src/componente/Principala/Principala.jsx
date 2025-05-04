import { useState } from "react";
import styles from "./Principala.module.css";
import SP from "../../assets/sp.png";
import Spanzuratoarea from "../Spanzuratoarea/Spanzuratoarea";
function Principala() {
  const [nume, setNume] = useState("");
  const [trimis, setTrimis] = useState(false);
  const [eroare, setEroare] = useState("");
  const [timpLimitat, setTimpLimitat] = useState("nelimitat");
  function handleFormSubmit(event) {
    event.preventDefault();

    if (nume.trim() === "") {
      setEroare("Numele este obligatoriu să fie introdus!");
      return;
    }
    setEroare("");
    setTrimis(true);
  }

  return !trimis ? (
    <div className={styles.quizContainer}>
      <h1 className={styles.titlu}>Jocul Spânzurătoarea</h1>
      <div className={styles.citatContainer}>
        <p className={styles.citat}>
          „Fiecare pas mic pe care îl faci te duce mai aproape de succes.”
        </p>
      </div>
      <div className={styles.spImageContainer}>
        <img src={SP} className={styles.spImage} />
      </div>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nume:</label>
          <input
            type="text"
            id="nume"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            placeholder="Introduceți numele"
          />
          <p className={styles.eroare}>{eroare}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="timpLimitat">Alegeți timpul:</label>
          <select
            id="timpLimitat"
            value={timpLimitat}
            onChange={(e) => setTimpLimitat(e.target.value)}
          >
            <option value="nelimitat">Nelimitat</option>
            <option value="100">100 secunde</option>
            <option value="50">50 secunde</option>
          </select>
        </div>
        <button type="submit" className={styles.trimitere}>
          Trimite
        </button>
      </form>
    </div>
  ) : (
    <Spanzuratoarea nume={nume} timpLimita={timpLimitat} />
  );
}

export default Principala;
