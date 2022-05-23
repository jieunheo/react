import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]); // 음식 리스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 여부
  const [httpError, setHttpError] = useState(); // 에러 여부

  useEffect(() => {
    // 병합 충돌 있었음 20220523
    // useEffect 안에는 프로미스를 바로 넣을 수 없음
    const fetchMeals = async () => {
      // 외부 데이터 가져오기
      const response = await fetch('https://react-study-2cfc9-default-rtdb.firebaseio.com/meals.json')

      if(!response.ok) {
        throw new Error('Something went wrong!');
      }

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
      setIsLoading(false);
    };

    // fetchMeals(); --> promose는 try/catch문이 안먹힘
    //               --> .catch() 안에 error시 코드 입력
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if(httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

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