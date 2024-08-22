import styles from './app.module.css';
import { useRef, useState } from 'react';
import Form from '../components/Form/Form';
import Diet from '../components/Diet/Diet';
import Equipment from '../components/Equipment/Equipment';
import Supplements from '../components/Supplements/Supplements';
import Steps from '../components/Steps/Steps';

function App() {
  const formRef = useRef();
  const [step, setStep] = useState(1);
  const [textError, setTextError] = useState(null);
  const [formData, setFormData] = useState({
    gender: "female",
    age: "18",
    height: "175",
    weight: "80",
    activity: "low",
    goal: "weight_loss",
  })
  const handleSubmit = () => { return formRef.current.handleSubmit() };

  return (
    <div className={styles.app}>
      <div className={styles.displayLeft}>
        <h1>Healthy Choice</h1>
      </div>
      <div className={styles.displayRight}>
        <div className={styles.view}>
          {step === 1 && <Form
            ref={formRef}
            formData={formData}
            setFormData={setFormData}
            setTextError={setTextError}
          />}
          {step === 2 && <Diet />}
          {step === 3 && <Equipment />}
          {step === 4 && <Supplements />}
        </div>
        <Steps
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
          textError={textError}
        />
      </div>
    </div >
  );
}

export default App;