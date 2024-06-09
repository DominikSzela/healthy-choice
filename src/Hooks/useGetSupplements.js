import { useState } from 'react';
import { getData } from '../API/getData';

const useGetSupplements = () => {
    const [isLoadingSupplements, setIsLoadingSupplements] = useState(true);
    const [errorSupplements, setErrorSupplements] = useState(null);
    const [supplements, setSupplements] = useState(null);

    getData('http://localhost:8081/healthy_choice/supplements')
        .then((result) => { setSupplements(result) })
        .catch(() => { setErrorSupplements('error get data') })
        .finally(() => { setIsLoadingSupplements(false); });

    return { isLoadingSupplements, errorSupplements, supplements };
};

export default useGetSupplements; 