import './index.css';
import styles from './app.module.css';
import { useState } from 'react';
import Form from './components/Form/Form';
import Recommendations from './components/Recommendations/Recommendations';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmitted = () => {
    setSubmitted(!submitted);
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        {submitted ?
          <Recommendations handleSubmitted={handleSubmitted} />
          :
          <Form handleSubmitted={handleSubmitted} />
        }
      </div>
    </div >
  );
}

export default App;