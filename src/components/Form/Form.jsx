import { useState } from 'react';
import styles from './form.module.css';

const Form = ({ handleSubmitted }) => {
    const [formData, setFormData] = useState({
        age: 0,
        weight: 0,
        height: 0,
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentState) => ({ ...currentState, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        fetch("http://localhost:8081/healthy_choice/submitted", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

        handleSubmitted();
    }

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <label>
                Wiek:
                <input
                    type='number'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                />
            </label>
            <label>
                Waga:
                <input
                    type='number'
                    name='weight'
                    value={formData.weight}
                    onChange={handleChange}
                />
            </label>
            <label>
                Wzrost:
                <input
                    type='number'
                    name='height'
                    value={formData.height}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;