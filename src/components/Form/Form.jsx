import { postForm } from '../../API/Form';
import styles from './form.module.css';
import { useState, forwardRef, useImperativeHandle } from 'react';

const Form = forwardRef(({ setTextError }, ref) => {
    const [formData, setFormData] = useState({
        gender: "female",
        age: "",
        height: "",
        weight: "",
        trainingDays: "0-1",
        goal: "weight_loss",
    })

    const [numberInputs, setNumberInputs] = useState({
        age: { name: 'age', polishName: 'wieku', min: 1, max: 250, unit: 'lat', classInput: styles.normalInput },
        height: { name: 'height', polishName: 'wzrostu', min: 1, max: 300, unit: 'cm', classInput: styles.normalInput },
        weight: { name: 'weight', polishName: 'wagi', min: 1, max: 350, unit: 'kg', classInput: styles.normalInput }
    });

    const handleKeyDown = (event) => {
        if (event.key === '-' || event.key === '.' || event.key === 'e') event.preventDefault(); //allow only numbers from 0 to 9
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

    const checkForm = () => {
        resetInputsStyles();
        return (
            validateInput(numberInputs.age, formData.age) &&
            validateInput(numberInputs.height, formData.height) &&
            validateInput(numberInputs.weight, formData.weight)
        );
    };

    const handleSubmit = () => {
        if (checkForm()) {
            postForm(formData);
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