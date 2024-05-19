import styles from './form.module.css';
import { postForm } from '../../API/Form';
import { defaultProperties } from './defaultProperties';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Form = forwardRef(({ formData, setFormData, setTextError }, ref) => {
    const [numberInputs, setNumberInputs] = useState(defaultProperties);

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

    const validateInput = ({ name, polishName, min, max, unit }, inputValue) => {
        const condition = min <= inputValue && inputValue <= max;
        setTextError(condition ? null : `Dostępny przedział ${polishName} od ${min} do ${max} ${unit}`);
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
        return validateInputs() ? (postForm(formData), true) : false;
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
                    onKeyDown={handleKeyDown}
                    className={numberInputs.age.classInput}
                />
            </label>
            <label>
                Wzrost:<br></br>
                <input
                    type='number'
                    name='height'
                    value={formData.height}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={numberInputs.height.classInput}
                />
            </label>
            <label>
                Waga:<br></br>
                <input
                    type='number'
                    name='weight'
                    value={formData.weight}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={numberInputs.weight.classInput}
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