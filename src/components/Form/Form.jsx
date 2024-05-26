import styles from './form.module.css';
import { postData } from '../../API/postData';
import { defaultProperties } from './defaultProperties';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Form = forwardRef(({ formData, setFormData, setTextError }, ref) => {
    const [numberInputs, setNumberInputs] = useState(defaultProperties);
    const postUrl = "http://localhost:8081/healthy_choice/submitted";
    const handleKeyDown = (event) => {
        if (['-', '.', 'e'].includes(event.key)) event.preventDefault(); //allow only numbers from 0 to 9
        event.target.value = event.target.value.replace(/^0/, ""); //prevents zeros before numbers
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentState) => ({ ...currentState, [name]: value }));
    }

    const resetInputsStyles = () => {
        setNumberInputs(() => {
            for (const category in numberInputs) {
                numberInputs[category].classInput = styles.normalInput;
            }
            return numberInputs;
        });
    };

    const validateInput = ({ name, missingText, min, max, unit }, inputValue) => {
        const condition = min <= inputValue && inputValue <= max;
        setTextError(condition ? null : `Dostępny przedział ${missingText} od ${min} do ${max} ${unit}`);
        const classInput = condition ? styles.normalInput : styles.errorInput;
        setNumberInputs(classInputs => ({
            ...classInputs,
            [name]: { ...classInputs[name], classInput }
        }));
        return condition;
    };

    const validateInputs = () => {
        return (
            validateInput(numberInputs.age, formData.age) &&
            validateInput(numberInputs.height, formData.height) &&
            validateInput(numberInputs.weight, formData.weight)
        )
    }

    const handleSubmit = () => {
        resetInputsStyles();
        return validateInputs() ? postData(formData, postUrl) : false; // return true if submitted successfully
    };

    useImperativeHandle(ref, () => ({ handleSubmit }));

    return (
        <form className={styles.wrapper}>
            <div className={styles.radios}>
                {['female', 'male'].map(optionGender => (
                    <div key={optionGender}>
                        <label>
                            {optionGender === 'female' ? 'Kobieta' : 'Mężczyzna'}<br />
                            <div className={styles.inputs}>
                                <input
                                    type='radio'
                                    name='gender'
                                    value={optionGender}
                                    onChange={handleChange}
                                    defaultChecked={(formData.gender === optionGender)}
                                />
                            </div>
                        </label>
                    </div>
                ))}
            </div>
            {Object.values(numberInputs).map(input => (
                <label key={input.name}>
                    {input.polishName}:<br />
                    <input
                        type='number'
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className={input.classInput}
                    />
                </label>
            ))}
            <label>
                ile razy tygodniowo trenujesz<br />
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
                Wybierz cel:<br />
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