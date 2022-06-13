import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// Link: 브라우저를 재 렌더링 하지 않고 이동
// NavLink: 해당 URL인 경우에 active 설정 가능 -> activeStyle

import FavoretesContext from "../../store/favorites-context";
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  const favoriteContext = useContext(FavoretesContext);

  const totalFavorits = favoriteContext.totalFavorites;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li><NavLink to='/'>All Meetups</NavLink></li>
          <li><NavLink to='/new-meetup'>Add New Meetups</NavLink></li>
          <li>
            <NavLink to='/favorites'>
              My Favorites
              <span className={classes.badge}>{totalFavorits}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;