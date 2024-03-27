import { useEffect, useState } from 'react';

const Recommendations = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/employee_database')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <div>{item.id}</div>
                    <div>{item.wiek}lat</div>
                    <div>{item.waga}kg</div>
                    <div>{item.wzrost}cm</div>
                </div>
            ))}
        </div>
    )
}

export default Recommendations;