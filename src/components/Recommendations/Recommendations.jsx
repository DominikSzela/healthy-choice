import { useEffect, useState } from 'react';

const Recommendations = ({ handleSubmitted }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/healthy_choice/diet')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>

            {data.map((item, index) => (
                <div key={index}>
                    <div>{item.id}</div>
                    <div>{item.age}lat</div>
                    <div>{item.weight}kg</div>
                    <div>{item.height}cm</div>
                </div>
            ))}
            <button onClick={handleSubmitted}>Powrót</button>
        </div>
    )
}

export default Recommendations;