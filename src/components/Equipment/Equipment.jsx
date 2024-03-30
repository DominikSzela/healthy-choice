import { useEffect, useState } from 'react';

const Equipment = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/healthy_choice/equipment')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div>Wyposażenie:</div>
            {data.map((item) => (
                <div key={item.id}>
                    <div>{item.type}</div>
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    )
}

export default Equipment;