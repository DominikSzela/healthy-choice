import { useEffect, useState } from 'react';

const Supplements = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/healthy_choice/supplements')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div>Suplementy:</div>
            {data.map((item) => (
                <div key={item.id}>
                    <div>{item.gym_supplements}</div>
                </div>
            ))}
        </div>
    )
}

export default Supplements;