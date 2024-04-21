import styles from './form.module.css';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Form = forwardRef(({ setTextError }, ref) => {
    const [formData, setFormData] = useState({
        gender: "female",
        age: 0,
        height: 0,
        weight: 0,
        trainingDays: "0-1",
        goal: "weight_loss",
    })

    const [inputsRange, setInputsRange] = useState({
        age: {
            min: 0,
            max: 250,
            classInput: styles.normalInput
        },
        height: {
            min: 0,
            max: 300,
            classInput: styles.normalInput
        },
        weight: {
            min: 0,
            max: 350,
            classInput: styles.normalInput
        }
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentState) => ({ ...currentState, [name]: value }));
    }

    const checkAge = () => {
        const condition = (inputsRange.age.min <= formData.age && formData.age < inputsRange.age.max);
        if (!condition) {
            setTextError(`Dostępny przedział wieku jest od ${inputsRange.age.min} do ${inputsRange.age.max} cm`);
            setInputsRange(prevRange => ({
                ...prevRange,
                age: { ...prevRange.age, classInput: styles.errorInput }
            }))
        }
        else {
            setTextError(null);
            setInputsRange(prevRange => ({
                ...prevRange,
                age: { ...prevRange.age, classInput: styles.normalInput }
            }))
        };
        return condition;
    }

    const checkHeight = () => {
        const condition = (inputsRange.height.min <= formData.height && formData.height < inputsRange.height.max);
        if (!condition) {
            setTextError(`Dostępny przedział wzrostu jest od ${inputsRange.height.min} do ${inputsRange.height.max} cm`)
            setInputsRange(prevRange => ({
                ...prevRange,
                height: { ...prevRange.height, classInput: styles.errorInput }
            }))
        }
        else {
            setTextError(null);
            setInputsRange(prevRange => ({
                ...prevRange,
                height: { ...prevRange.height, classInput: styles.normalInput }
            }))
        };
        return condition;
    }

    const checkWeight = () => {
        const condition = (inputsRange.weight.min <= formData.weight && formData.weight < inputsRange.weight.max);
        if (!condition) {
            setTextError(`Dostępny przedział wagi jest od ${inputsRange.weight.min} do ${inputsRange.weight.max} cm`)
            setInputsRange(prevRange => ({
                ...prevRange,
                weight: { ...prevRange.weight, classInput: styles.errorInput }
            }))
        }
        else {
            setTextError(null);
            setInputsRange(prevRange => ({
                ...prevRange,
                weight: { ...prevRange.weight, classInput: styles.normalInput }
            }))
        };
        return condition;
    }

    const resetInputsStyles = () => {
        setInputsRange(prevRange => {
            const ranges = { ...prevRange };
            for (const item in ranges) {
                ranges[item].classInput = styles.normalInput;
            }
            return ranges;
        });
    }


    const checkForm = () => {
        resetInputsStyles();
        return (checkAge() && checkHeight() && checkWeight());
    }

    const sendData = () => {
        fetch("http://localhost:8081/healthy_choice/submitted", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }


    const handleSubmit = () => {
        if (checkForm()) {
            sendData();
            return true;
        }
        else return false;
    };

    useImperativeHandle(ref, () => ({ handleSubmit }));

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
                    className={inputsRange.age.classInput}
                />
            </label>
            <label>
                Wzrost:<br></br>
                <input
                    type='number'
                    name='height'
                    value={formData.height}
                    onChange={handleChange}
                    className={inputsRange.height.classInput}
                />
            </label>
            <label>
                Waga:<br></br>
                <input
                    type='number'
                    name='weight'
                    value={formData.weight}
                    onChange={handleChange}
                    className={inputsRange.weight.classInput}
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