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

    const [RangeAndStyle, setRangeAndStyle] = useState({
        age: { min: 1, max: 250, classInput: styles.normalInput },
        height: { min: 1, max: 300, classInput: styles.normalInput },
        weight: { min: 1, max: 350, classInput: styles.normalInput }
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
        setRangeAndStyle(() => {
            for (const category in RangeAndStyle) {
                RangeAndStyle[category].classInput = styles.normalInput;
            }
            return RangeAndStyle;
        });
    };

    const validateInput = (category, { min, max }, inputValue, missingText) => {
        const condition = min <= inputValue && inputValue <= max;
        setTextError(condition ? null : `Dostępny przedział ${missingText} jest od ${min} do ${max} cm`);
        const classInput = condition ? styles.normalInput : styles.errorInput;
        setRangeAndStyle(prevRangeAndStyle => ({
            ...prevRangeAndStyle,
            [category]: { ...prevRangeAndStyle[category], classInput }
        }));
        return condition;
    };

    const checkForm = () => {
        resetInputsStyles();
        const { age, height, weight } = formData;
        return (
            validateInput('age', RangeAndStyle.age, age, 'wieku') &&
            validateInput('height', RangeAndStyle.height, height, 'wzrostu') &&
            validateInput('weight', RangeAndStyle.weight, weight, 'wagi')
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
                    className={RangeAndStyle.age.classInput}
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
                    className={RangeAndStyle.height.classInput}
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
                    className={RangeAndStyle.weight.classInput}
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