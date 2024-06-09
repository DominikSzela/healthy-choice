import { useState } from 'react';
import { getData } from '../API/getData';

const useGetEquipment = () => {
    const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
    const [errorEquipment, setErrorEquipment] = useState(null);
    const [equipment, setEquipment] = useState(null);

    getData('http://localhost:8081/healthy_choice/equipment')
        .then((result) => { setEquipment(result) })
        .catch(() => { setErrorEquipment('error get data') })
        .finally(() => { setIsLoadingEquipment(false); });

    return { isLoadingEquipment, errorEquipment, equipment };
};

export default useGetEquipment; 