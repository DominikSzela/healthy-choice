import styles from './steps.module.css'

const Steps = ({ step, setStep, handleSubmit, textError }) => {
    const nextStep = () => {
        if ((step === 1 && !handleSubmit())) return; //go to step 2 if the form was successfully submitted
        setStep(step + 1)
    };
    const previousStep = () => setStep(step - 1);

    return (
        <div className={styles.wrapper}>
            {textError && (
                <div className={styles.textError} >{textError}</div>
            )}
            {step !== 1 ?
                (<button onClick={previousStep}>Poprzedni</button>)
                :
                (<button style={{ visibility: "hidden" }}>Poprzedni</button>)
            }
            {step !== 4 ?
                (<button onClick={nextStep}>Następny</button>)
                :
                (<button style={{ visibility: "hidden" }}>Następny</button>)
            }
        </div>
    )
}

export default Steps;