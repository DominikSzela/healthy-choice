import { useEffect, useState } from 'react';

const Diet = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/healthy_choice/diet')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div>Dieta:</div>
            {data.map((item) => (
                <div key={item.id}>
                    <div>{item.gym_diet}</div>
                </div>
            ))}
        </div>
    )
}

export default Diet;