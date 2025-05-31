import React, { useEffect, useState } from 'react' // Fix import
import './meal.css'
const Meal = () => {
    const [mealData, setmealData] = useState([]); // Initialize as empty array
    const [area, setArea] = useState('Canadian'); // Default area set to Canadian
    const [inputData, setinputData] = useState('');
    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const api = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + area);
                if (!api.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await api.json();
                setmealData(data.meals || []); // Fallback to empty array if no meals
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataFromAPI();
    }, [area]);

    useEffect(() => {
        const debounceFetch = setTimeout(async () => {
            if (inputData.trim() === '') return;
            try {
                const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputData);
                if (!api.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await api.json();
                setmealData(data.meals || []); // Fallback to empty array if no meals
            } catch (error) {
                console.error('Error fetching search data:', error);
            }
        }, 500); // Debounce delay of 500ms

        return () => clearTimeout(debounceFetch); // Cleanup timeout on input change
    }, [inputData]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="mx-auto text-center my-3 mx-5">
                <button onClick={() => setArea('Canadian')} type="button" className="btn btn-secondary mx-2">Canadian</button>
                <button onClick={() => setArea('Indian')} type="button" className="btn btn-primary mx-2">Indian</button>
                <button onClick={() => setArea('American')} type="button" className="btn btn-success mx-2">American</button>
                <button onClick={() => setArea('Thai')} type="button" className="btn btn-danger mx-2">Thai</button>
                <button onClick={() => setArea('Chinese')} type="button" className="btn btn-warning mx-2">Chinese</button>
                <button onClick={() => setArea('Japanese')} type="button" className="btn btn-info mx-2">Japanese</button>
                <button onClick={() => setArea('Russian')} type="button" className="btn btn-success mx-2">Russian</button>
            </div>
            <form className="text-center my-3" onSubmit={handleSearch}>
                <input onChange={(e) => setinputData(e.target.value)} type="text" />
            </form>
            <div>
                {mealData.length > 0 ? (
                    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', listStyleType: 'none', padding: 0 }}>
                        {mealData.map((meal) => (
                            <li key={meal.idMeal}>
                                <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '220px', borderRadius: '10px', border: '2px solid blue' }} />
                                <p>{meal.strMeal}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default Meal