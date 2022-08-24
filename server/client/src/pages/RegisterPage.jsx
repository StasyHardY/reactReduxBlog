import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-black text-center">Регистрация</h1>

      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        id="username"
        type="text"
        placeholder="Username"
      />

      <label
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="password"
        type="password"
        placeholder="******************"
      />

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Подтвердить
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-black"
        >
          Уже зарегистрированы ?
        </Link>
      </div>
    </form>
  );
}
