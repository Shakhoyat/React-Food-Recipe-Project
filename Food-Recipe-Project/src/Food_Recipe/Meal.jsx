import React, { useEffect, useState } from 'react' // Fix import

const Meal = () => {
    const [mealData, setmealData] = useState([]); // Initialize as empty array
    const [area, setArea] = useState('Canadian'); // Default area set to Canadian
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

    return (
        <>
            <div className="mx-auto text-center my-3">
                <button onClick={() => setArea('Canadian')} type="button" className="btn btn-secondary">Canadian</button>
                <button
                    onClick={() => setArea('Indian')}
                    type="button" className="btn btn-primary">
                    Indian
                </button>
                <button onClick={() => setArea('American')} type="button" className="btn btn-success">American</button>
                <button onClick={() => setArea('Thai')} type="button" className="btn btn-danger">Thai</button>
                <button onClick={() => setArea('Chinese')} type="button" className="btn btn-warning">Chinese</button>
                <button onClick={() => setArea('Japanese')} type="button" className="btn btn-info">Japanese</button>
                <button onClick={() => setArea('Russian')} type="button" className="btn btn-success">Russian</button>
            </div>
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