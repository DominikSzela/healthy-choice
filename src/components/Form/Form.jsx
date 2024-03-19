import { useState } from 'react';
import styles from './styles.module.css';


const Form = () => {
    const [formData, setFormData] = useState({
        waga: 0,
        wiek: 0,
        wzrost: 0,
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentState) => ({ ...currentState, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <label>
                Waga:
                <input
                    type='number'
                    name='waga'
                    value={formData.waga}
                    onChange={handleChange}
                />
            </label>
            <label>
                Wiek:
                <input
                    type='number'
                    name='wiek'
                    value={formData.wiek}
                    onChange={handleChange}
                />
            </label>
            <label>
                Wzrost:
                <input
                    type='number'
                    name='wzrost'
                    value={formData.wzrost}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;