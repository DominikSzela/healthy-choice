import { useEffect, useState } from 'react';

const Diet = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/healthy_choice/diets')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div>Dieta:</div>
            {data.map((diet) => (
                <div key={diet.id}>
                    <div>{diet.type}</div>
                    <div>{diet.name}</div>
                    <div>{diet.calories}</div>
                    <div>{diet.protein}</div>
                    <div>{diet.carbs}</div>
                    <div>{diet.fat}</div>
                </div>
            ))}
        </div>
    )
}

export default Diet;