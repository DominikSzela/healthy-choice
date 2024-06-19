import { useState } from 'react';
import { postData } from '../API/postData';

const usePostForm = (data) => {
    const [isSending, setIsSending] = useState(null);
    const [errorForm, setErrorForm] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    const postForm = async () => {
        if (!data) return setErrorForm('lack of data');
        setIsSending(true);

        await postData(data, 'http://localhost:8081/healthy_choice/submitted')
            .then(response => {
                if (response.error) setErrorForm(response.error);
                else {
                    setIsSuccess(true);
                    return true; //go to step 2
                };
            })
            .catch(error => setErrorForm(error))
            .finally(() => setIsSending(false));
    };

    return { isSending, errorForm, isSuccess, postForm };
};

export default usePostForm;