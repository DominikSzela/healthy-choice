import styles from './form.module.css';

const defaultProperties = {
    age: {
        name: 'age',
        polishName: 'wiek',
        missingText: 'wieku',
        min: 1,
        max: 250,
        unit: 'lat',
        classInput: styles.normalInput
    },
    height: {
        name: 'height',
        polishName: 'wzrost',
        missingText: 'wzrostu',
        min: 1,
        max: 300,
        unit: 'cm',
        classInput: styles.normalInput
    },
    weight: {
        name: 'weight',
        polishName: 'waga',
        missingText: 'wagi',
        min: 1,
        max: 350,
        unit: 'kg',
        classInput: styles.normalInput
    }
}

export { defaultProperties }