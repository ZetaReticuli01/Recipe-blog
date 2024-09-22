const mealAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

fetch(mealAPI)
  .then(response => response.json())
  .then(data => {
    console.log(data); 
  })
  .catch(error => console.error('Error:', error));
