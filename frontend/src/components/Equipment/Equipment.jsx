import GetHandler from '../GetHandler/GetHandler';
import useGetEquipment from '../../Hooks/useGetEquipment';
import styles from './equipment.module.css'

const Equipment = () => {
    const { isLoadingEquipment, errorEquipment, equipment } = useGetEquipment();

    return (
        <div className={styles.wrapper}>
            <h1>Wyposażenie:</h1>
            <GetHandler
                isLoading={isLoadingEquipment}
                error={errorEquipment}
            >
                <div className={styles.equipmentItems} >
                    {equipment && equipment.map(item => (
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

export default Equipment;