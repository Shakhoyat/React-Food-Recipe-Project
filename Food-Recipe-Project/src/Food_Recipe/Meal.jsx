import React, { useEffect, useState } from 'react' // Fix import

const Meal = () => {
    const [mealData, setmealData] = useState([]); // Initialize as empty array

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const api = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
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
    }, []);

    return (
        <>
            <div className="mx-auto text-center my-3">
                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-secondary">Secondary</button>
                <button type="button" class="btn btn-success">Success</button>
                <button type="button" class="btn btn-danger">Danger</button>
                <button type="button" class="btn btn-warning">Warning</button>
                <button type="button" class="btn btn-info">Info</button>
                <button type="button" class="btn btn-light">Light</button>
                <button type="button" class="btn btn-dark">Dark</button>

                <button type="button" class="btn btn-link">Link</button>
            </div >
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