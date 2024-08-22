import { useState, useEffect } from 'react';
import { getData } from '../API/getData';

const useGetSupplements = () => {
    const [isLoadingSupplements, setIsLoadingSupplements] = useState(true);
    const [errorSupplements, setErrorSupplements] = useState(null);
    const [supplements, setSupplements] = useState(null);

    useEffect(() => {
        getData('http://localhost:8081/healthy_choice/supplements')
            .then((result) => setSupplements(result))
            .catch((error) => setErrorSupplements(error))
            .finally(() => setIsLoadingSupplements(false));
    }, []);

    return { isLoadingSupplements, errorSupplements, supplements };
};

export default useGetSupplements; 