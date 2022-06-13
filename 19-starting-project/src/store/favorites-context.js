import { createContext, useState } from "react"

const FavoretesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (meetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {}
});

export const FavoretesContextProvider = ({ children }) => {
  const [useFavorites, setUseFavorites] = useState([]);

  // 추가
  const addFavoriteHandler = (meetup) => {
    // concat(): 값이 추가된 새 배열 반환
    setUseFavorites(prevFavorite => prevFavorite.concat(meetup));
  }

  // 삭제
  const removeFavoriteHandler = (meetupId) => {
    setUseFavorites(prevFavorite => prevFavorite.filter(meetup => meetup.id !== meetupId));
  }

  // 조회
  const itemIsFavoriteHandler = (meetupId) => {
    // some(): 내부 값이 적어도 하나가 true/false를 반환하면 전체값이 frue/false가 된다
    return useFavorites.some(meetup => meetup.id === meetupId);
  }

  const context = {
    favorites: useFavorites,
    totalFavorites: useFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };

  return (
    <FavoretesContext.Provider value={context}>
      { children }
    </FavoretesContext.Provider>
  )
}

export default FavoretesContext;