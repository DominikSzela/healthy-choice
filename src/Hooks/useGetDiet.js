import { useState } from 'react';
import { getData } from '../API/getData';

const useGetDiet = () => {
    const [isLoadingDiet, setIsLoadingDiet] = useState(true);
    const [errorDiet, setErrorDiet] = useState(null);
    const [diet, setDiet] = useState(null);

    getData('http://localhost:8081/healthy_choice/diets')
        .then((result) => { setDiet(result) })
        .catch(() => { setErrorDiet('error get data') })
        .finally(() => { setIsLoadingDiet(false); });

    return { isLoadingDiet, errorDiet, diet };
};

export default useGetDiet;