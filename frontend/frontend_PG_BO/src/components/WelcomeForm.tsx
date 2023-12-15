import React from 'react';
import styles from "../pages/Welcome.module.css"

const WelcomeForm: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Welcome</h1>
        <p className={styles.description}>kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung kurzbeschreibung </p>
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <img className={styles.cardIcon} src="src/assets/search.png" alt="Icon"/>
                <h3 className={styles.cardTitle}>Search</h3>
                <p className={styles.cardText}>for your asset and potential matcher assets and save them as Main Asset and Shortlist of matcher assets</p>
            </div>
            <div className={styles.card}>
                <img className={styles.cardIcon} src="src/assets/calculator.png" alt="Icon"/>
                <h3 className={styles.cardTitle}>Calculate and Save</h3>
                <p className={styles.cardText}>a portfolio with the desired beta or sharpe ratio </p>
            </div>
            <div className={styles.card}>
                <img className={styles.cardIcon} src="src/assets/notes.png" alt="Icon"/>
                <h3 className={styles.cardTitle}>Watch</h3>
                <p className={styles.cardText}>your saved portfolios: the beta and sharpe ratio of your portfolios changes dynamically so delete or edit them</p>
            </div>
        </div>
    </div>
  );
};

export default WelcomeForm;
