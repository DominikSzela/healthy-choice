import './index.css';
import styles from './app.module.css';
import Form from './components/Form/Form';
import Recommendations from './components/Recommendations/Recommendations';

function App() {
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <Form />
        <Recommendations />
      </div>
    </div >
  );
}

export default App;