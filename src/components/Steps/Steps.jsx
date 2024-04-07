import styles from './steps.module.css'

const Steps = ({ step, nextStep, previousStep }) => {

    return (
        <div className={styles.wrapper}>
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