import { useState } from 'react';
import { Autocomplete, AutocompleteItem, Button} from '@nextui-org/react';


function RecommendSys() {
    const [filmName, setFilmName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [hints, setHints] = useState([]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setFilmName(inputValue);

        // Fetch hints when input changes
        fetchHints(inputValue);
    };

    const fetchHints = (input) => {
        fetch(`http://localhost:5000/api/hint?input=${encodeURIComponent(input)}`)
            .then(response => response.json())
            .then(data => {
                setHints(data.suggestions.slice(0,5));
            })
            .catch(error => {
                console.error('Error fetching hints:', error);
            });
    };

    const handleRecommendation = () => {
        fetch(`http://localhost:5000/api/recommend?filmName=${encodeURIComponent(filmName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRecommendations(data.recommendations);
            })
            .catch(error => {
                console.error('Error fetching recommendations:', error);
            });
    };

    return (
        <div className=''>
            <div className='flex justify-center w-[50%]'>
                <Autocomplete
                    type="text"
                    placeholder="Enter Film Name"
                    selectorIcon=''
                    menuTrigger='input'
                    value={filmName}
                    onInput={handleInputChange}
                    onSelect={handleInputChange}
                >
                        {hints.map((hint) => (
                        <AutocompleteItem key={hint} value={hint}>
                            {hint}
                        </AutocompleteItem>
                        ))}
                </Autocomplete>
                <Button onClick={handleRecommendation}>Get Recommendations</Button>
            </div>

            <div>
                <h2>Recommendations:</h2>
                <ul>
                    {recommendations.map((movie, index) => (
                        <li key={index}>{movie}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default RecommendSys;
