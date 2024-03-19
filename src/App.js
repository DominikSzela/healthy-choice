import './index.css';
import Form from './components/Form/Form';

function App() {
  const styles = {
    wrapper: {
      backgroundColor: 'var(--primary)',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  return (
    <div style={styles.wrapper}>
      <Form />
    </div >
  );
}

export default App;