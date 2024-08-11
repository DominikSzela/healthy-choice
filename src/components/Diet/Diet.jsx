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
                    <h1>Dieta {diet.name}</h1>
                    <p className={styles.description}>Podczas diety, jak i na co dzień, bardzo ważne jest spożywanie produktów dobrej jakości. Ważne jest również dbanie o zdrowe nawyki, takie jak odpowiednia długość i jakość snu, picie odpowiedniej ilości wody oraz regularny odpoczynek.</p>
                    <h2>Twoje zalecane proporcje to:</h2>
                    <div className={styles.macronutrients}>
                        <div className={styles.proportion}>
                            <div className={styles.type}>Białko:</div>
                            <div className={styles.value}>{diet.protein}%</div>
                        </div>
                        <div className={styles.proportion}>
                            <div className={styles.type}>Węglowodany:</div>
                            <div className={styles.value}>{diet.carbohydrates}%</div>
                        </div>
                        <div className={styles.proportion}>
                            <div className={styles.type}>Tłuszcze:</div>
                            <div className={styles.value}>{diet.fat}%</div>
                        </div>
                    </div>
                </div >
            )}
        </GetHandler >
    );
}

export default Diet;