import styles from './steps.module.css'
import { forwardRef } from 'react';

const Steps = forwardRef(({ formRef, step, textError, setStep }, ref) => {
    const nextStep = () => {
        if (step === 1) {
            const isFormSent = formRef.current.handleSubmit() //use handleSubmit() from Form component, to send form
            if (!isFormSent) return;
        }
        setStep(step + 1);
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
})

export default Steps;