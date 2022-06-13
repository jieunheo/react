import React, { useContext } from "react";

import FavoretesContext from "../../store/favorites-context";
import Card from "../ui/Card";
import classes from './MeetupItem.module.css';

const MeetupItem = ({ id, title, image, address, description }) => {
  const favoriteContext = useContext(FavoretesContext);
  const itemIsFavorite = favoriteContext.itemIsFavorite(id);

  const toggleFavoriteStateHandler = () =>{
    if(itemIsFavorite) {
      favoriteContext.removeFavorite(id);
    } else {
      favoriteContext.addFavorite({
        id: id,
        title: title,
        image: image,
        address: address,
        description: description
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStateHandler}>
            {itemIsFavorite ? 'Remove From Favorites' : 'To Favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;