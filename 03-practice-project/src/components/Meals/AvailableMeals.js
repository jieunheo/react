import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // 병합 충돌 있었음 20220523
    // useEffect 안에는 프로미스를 바로 넣을 수 없음
    const fetchMeals = async () => {
      // 외부 데이터 가져오기
      const response = await fetch('https://react-study-2cfc9-default-rtdb.firebaseio.com/meals.json')
      // 해당 데이터를 json 형식으로 만들기 
      const responseData = await response.json();

      const loadedMeals = [];
      // json 형식의 값을 객체로 만들어 loadedMeals 배열에 넣기
      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          discription: responseData[key].description,
          price: responseData[key].price
        });
      };

      // state에 값 넣기
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );

  return(
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;