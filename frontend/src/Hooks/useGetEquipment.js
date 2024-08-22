import { useState, useEffect } from 'react';
import { getData } from '../API/getData';

const useGetEquipment = () => {
    const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
    const [errorEquipment, setErrorEquipment] = useState(null);
    const [equipment, setEquipment] = useState(null);

    useEffect(() => {
        getData('http://localhost:8081/healthy_choice/equipment')
            .then((result) => setEquipment(result))
            .catch((error) => setErrorEquipment(error))
            .finally(() => setIsLoadingEquipment(false));
    }, []);

    return { isLoadingEquipment, errorEquipment, equipment };
};

export default useGetEquipment; 