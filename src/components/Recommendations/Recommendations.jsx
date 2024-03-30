import Diet from '../Diet/Diet';
import Supplements from '../Supplements/Supplements';
import Equipment from '../Equipment/Equipment';

const Recommendations = ({ handleSubmitted }) => {

    return (
        <div>
            <div>
                <Diet />
                <Equipment />
                <Supplements />
            </div>
            <button onClick={handleSubmitted}>Powrót</button>
        </div>
    )
}

export default Recommendations;