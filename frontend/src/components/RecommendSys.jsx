import { useState } from 'react';
import { Button } from '@nextui-org/react';

function RecommendSys() {
    const [userId, setUserId] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [hints, setHints] = useState([]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setUserId(inputValue);

        // Fetch hints when input changes
        fetchHints(inputValue);
    };

    const fetchHints = (input) => {
        fetch(`http://localhost:5000/api/hint?input=${encodeURIComponent(input)}`)
            .then(response => response.json())
            .then(data => {
                setHints(data.suggestions);
            })
            .catch(error => {
                console.error('Error fetching hints:', error);
            });
    };

    const handleRecommendation = () => {
        fetch(`http://localhost:5000/api/recommend?userId=${encodeURIComponent(userId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRecommendations(data.recommendations);
                console.log(recommendations)
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
            });
    };

    return (
        <div className=''>
            <div className='flex justify-center w-[50%]'>
                <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={handleInputChange}
                />
                <Button onClick={handleRecommendation}>Get Recommendations</Button>
            </div>

            <div>
                <h1>Hint: {hints.map((userId, index) => (
                    <p key={index}>User {userId}</p>
                ))}</h1>
                <h2>Recommendations:</h2>
                <ul>
                    {recommendations.map((tour, index) => (
                        <li key={index}>{tour}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default RecommendSys;
