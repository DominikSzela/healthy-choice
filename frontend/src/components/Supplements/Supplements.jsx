import GetHandler from '../GetHandler/GetHandler';
import useGetSupplements from '../../Hooks/useGetSupplements';
import styles from './supplements.module.css'

const Supplements = () => {
    const { isLoadingSupplements, errorSupplements, supplements } = useGetSupplements();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Suplementy:</h1>
            <GetHandler
                isLoading={isLoadingSupplements}
                error={errorSupplements}
            >
                <div className={styles.supplementsItems} >
                    {supplements && supplements.map(item => (
                        <div className={styles.box} key={item.id}>
                            <div className={styles.titleBox}>{item.name}</div>
                            <div>{item.description}</div>
                        </div>
                    ))}
                </div>
            </GetHandler >
        </div>
    );
}

export default Supplements;