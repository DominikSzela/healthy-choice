import { useState, useEffect } from 'react';
import { getData } from '../API/getData';

const useGetDiet = () => {
    const [isLoadingDiet, setIsLoadingDiet] = useState(true);
    const [errorDiet, setErrorDiet] = useState(null);
    const [diet, setDiet] = useState(null);

    useEffect(() => {
        getData('http://localhost:8081/healthy_choice/diet')
            .then((result) => setDiet(result))
            .catch((error) => setErrorDiet(error))
            .finally(() => setIsLoadingDiet(false));
    }, []);

    return { isLoadingDiet, errorDiet, diet };
};

export default useGetDiet;