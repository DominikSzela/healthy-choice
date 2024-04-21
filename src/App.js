import styles from './app.module.css';
import { useRef, useState } from 'react';
import Form from './components/Form/Form';
import Diet from './components/Diet/Diet';
import Equipment from './components/Equipment/Equipment';
import Supplements from './components/Supplements/Supplements';
import Steps from './components/Steps/Steps';

function App() {
  const [step, setStep] = useState(1);
  const [textError, setTextError] = useState(null);
  const formRef = useRef();

  const nextStep = () => {
    if (step === 1) {
      const isFormSent = formRef.current.handleSubmit() //use handleSubmit() from Form component, to send form
      if (!isFormSent) return;
    }
    setStep(step + 1);
  };

  const previousStep = () => setStep(step - 1);


  return (
    <div className={styles.app}>
      <div className={styles.displayLeft}>
        <h1>Healthy Choice</h1>
      </div>
      <div className={styles.displayRight}>
        <div className={styles.view}>
          {step === 1 && <Form ref={formRef} setTextError={setTextError} />}
          {step === 2 && <Diet />}
          {step === 3 && <Equipment />}
          {step === 4 && <Supplements />}
        </div>
        <Steps
          step={step}
          textError={textError}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      </div>
    </div >
  );
}

export default App;