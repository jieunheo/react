import React, { useContext } from "react";

import FavoretesContext from "../store/favorites-context";
import MeetupList from "../components/meetups/MeetupList";

const FavoritesPage = () => {
  const favoriteContext = useContext(FavoretesContext);

  let content;
  if(favoriteContext.totalFavorites === 0) {
    content = <p>You got not favorites yet. Start adding some?</p>
  } else {
    content = <MeetupList meetups={favoriteContext.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;