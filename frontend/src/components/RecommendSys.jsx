import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function RecommendSys() {
    const [recommendations, setRecommendations] = useState([]);
    const [tours, setTours] = useState([]);

    const getTours = () => {
        axios.get(`https://6645c30ab8925626f89310d5.mockapi.io/api/v1/tour`)
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.error('Error fetching tours:', error);
            });
    };

    useEffect(() => {
        getTours();
        // Load recommendations from local storage if available
        const savedRecommendations = localStorage.getItem('recommendations');
        if (savedRecommendations) {
            setRecommendations(JSON.parse(savedRecommendations));
        }
    }, []);

    const handleRecommendation = (tourName) => {
        console.log('Fetching recommendations for:', tourName);  // Debug log
        axios.get(`http://localhost:5000/api/recommend?tourName=${encodeURIComponent(tourName)}`)
            .then(response => {
                console.log('Received recommendations:', response.data.recommendations);  // Debug log
                setRecommendations(response.data.recommendations);
                // Save recommendations to local storage
                localStorage.setItem('recommendations', JSON.stringify(response.data.recommendations));
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
            });
    };

    const handleTourClick = (tourName) => {
        console.log('Tour clicked:', tourName);  // Debug log
        handleRecommendation(tourName);
    };

    return (
        <div>
            <div className='gap-2 grid grid-cols-10'>
                {tours.map((tour, index) => (
                    <Card
                        isPressable
                        className='flex p-3 w-20 cursor-pointer'
                        key={index}
                        onPress={() => handleTourClick(tour.tourName)}
                        as={Link}
                        to={`/search`}
                    >
                        {tour.tourName}
                    </Card>
                ))}
            </div>

            <div>
                <h2>Recommendations:</h2>
                <div className='flex gap-2'>
                    {recommendations.map((recommendTour, index) => (
                        <Card 
                            className='p-3' 
                            key={index}
                            isPressable
                            as={Link}
                            to={`/search`}
                            onPress={() => handleRecommendation(recommendTour)}
                        >{recommendTour}</Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecommendSys;
