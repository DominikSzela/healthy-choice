import styles from './form.module.css';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Form = forwardRef((props, ref) => {
    const [validForm, setValidForm] = useState(false);

    const [formData, setFormData] = useState({
        gender: "female",
        age: 0,
        height: 0,
        weight: 0,
        trainingDays: "0-1",
        goal: "weight_loss"
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentState) => ({ ...currentState, [name]: value }));
    }

    const handleSubmit = () => {
        if ((0 < formData.age && formData.height && formData.weight < 300)) {
            setValidForm(true);
        }
        else {
            setValidForm(false);
            return;
        }

        fetch("http://localhost:8081/healthy_choice/submitted", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        ;
    }

    useImperativeHandle(ref, () => ({
        handleSubmit: handleSubmit
    }));

    return (
        <form className={styles.wrapper}>
            <div className={styles.radios}>
                <div>
                    <label>
                        Kobieta<br></br>
                        <div className={styles.inputs}>
                            <input
                                type='radio'
                                name='gender'
                                value='female'
                                onChange={handleChange}
                                defaultChecked
                            />
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        Mężczyzna<br></br>
                        <div className={styles.inputs}>
                            <input
                                type='radio'
                                name='gender'
                                value='male'
                                onChange={handleChange}
                            />
                        </div>
                    </label>
                </div>
            </div>
            <label>
                Wiek:<br></br>
                <input
                    type='number'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                />
            </label>
            <label>
                Wzrost:<br></br>
                <input
                    type='number'
                    name='height'
                    value={formData.height}
                    onChange={handleChange}
                />
            </label>
            <label>
                Waga:<br></br>
                <input
                    type='number'
                    name='weight'
                    value={formData.weight}
                    onChange={handleChange}
                />
            </label>
            <label>
                ile razy tygodniowo trenujesz<br></br>
                <select
                    name="trainingDays"
                    value={formData.trainingDays}
                    onChange={handleChange}>
                    <option value="0-1">0-1</option>
                    <option value="2-4">2-4</option>
                    <option value="5-7">5-7</option>
                </select>
            </label>
            <label>
                Wybierz cel:<br></br>
                <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}>
                    <option value="weight_loss">schudnąć</option>
                    <option value="maintenance">utrzymać aktualną masę ciała</option>
                    <option value="muscle_gain">nabrać masy mięśniowej</option>
                </select>
            </label>
        </form>
    )
})

export default Form;