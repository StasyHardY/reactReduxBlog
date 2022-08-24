/* eslint-disable react/button-has-type */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';

export function Navbar() {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: 'orange',
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы');
  };

  return (
    <div className="flex py-4 justify-between items-center ">
      <span className="flex text-xl justify-center items-center    rounded-sm">
        Blog.EVERYWHERE
      </span>

      {isAuth && (
        <ul className="flex gap-8 text-black ">
          <li>
            <NavLink
              to="/"
              href="/"
              className="text-sm text-gray-400 hover:text-orange-600 hover:underline underline-offset-8 "
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Главная
            </NavLink>
          </li>

          <li />
          <li>
            <NavLink
              to="/new"
              href="/"
              className="text-sm text-gray-600 hover:text-orange-600 hover:underline underline-offset-8"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>Выйти</button>
        ) : (
          <Link to="/login"> Войти </Link>
        )}
      </div>
    </div>
  );
}
