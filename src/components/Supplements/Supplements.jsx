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
            {data.map((supplement) => (
                <div key={supplement.id}>
                    <div>{supplement.type}</div>
                    <div>{supplement.name}</div>
                </div>
            ))}
        </div>
    )
}

export default Supplements;