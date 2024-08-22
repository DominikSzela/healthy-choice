import GetHandler from '../GetHandler/GetHandler';
import useGetDiet from '../../Hooks/useGetDiet';
import styles from './diet.module.css';

const Diet = () => {
    const { isLoadingDiet, errorDiet, diet } = useGetDiet();

    return (
        <GetHandler
            isLoading={isLoadingDiet}
            error={errorDiet}
        >
            {diet && (
                <div className={styles.dietBox}>
                    <h1 className={styles.title}>Dieta {diet.name}</h1>
                    <p className={styles.generalDescription}>Podczas diety, jak i na co dzień, bardzo ważne jest spożywanie produktów dobrej jakości. Ważne jest również dbanie o zdrowe nawyki, takie jak odpowiednia długość i jakość snu, picie odpowiedniej ilości wody oraz regularny odpoczynek.</p>
                    <h2>Twoja przemiana materii:</h2>
                    <div className={styles.details}>
                        <div className={styles.ratio}>
                            <div>Podstawowa (PPM):</div>
                            <div>{diet.PPM} kcal</div>
                        </div>
                        <div className={styles.ratio}>
                            <div>Całkowita (CPM):</div>
                            <div>{diet.CPM} kcal</div>
                        </div>
                    </div>
                    <h2>Twoje zalecane proporcje procentowe:</h2>
                    <div className={styles.details}>
                        <div className={styles.ratio}>
                            <div>Białko:</div>
                            <div>{diet.protein} %</div>
                        </div>
                        <div className={styles.ratio}>
                            <div>Węglowodany:</div>
                            <div>{diet.carbohydrates} %</div>
                        </div>
                        <div className={styles.ratio}>
                            <div>Tłuszcze:</div>
                            <div>{diet.fat} %</div>
                        </div>
                    </div>
                    <h2>Twoje zalecane proporcje w kcal:</h2>
                    <div className={styles.details}>
                        <div className={styles.ratio}>
                            <div>Białko:</div>
                            <div>{diet.protein * diet.CPM / 100} kcal</div>
                        </div>
                        <div className={styles.ratio}>
                            <div>Węglowodany:</div>
                            <div>{diet.carbohydrates * diet.CPM / 100} kcal</div>
                        </div>
                        <div className={styles.ratio}>
                            <div>Tłuszcze:</div>
                            <div>{diet.fat * diet.CPM / 100} kcal</div>
                        </div>
                    </div>
                </div >
            )}
        </GetHandler >
    );
}

export default Diet;