/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { removePost } from '../redux/features/post/postSlice';
import axios from '../utils/axios';
import { Notification } from '../components/Notification';

export function PostPage() {
  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const removeHandler = () => {
    try {
      dispatch(removePost(params.id));
        <Notification />;
        navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="text-black text-xl text-center py-10 ">
        <InfinitySpin className="mx-auto " width="200" color="#4fa94d" />
        Загрузка...
      </div>
    );
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link to="/">Назад</Link>
      </button>
      <div className="flex items-center justify-center ">
        {' '}
        <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-400 " />
              <div className="text-lg font-bold text-slate-700">
                {post.username}
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                Category
              </button>
              <div className="text-xs text-neutral-500">
                {' '}
                <Moment data={post.createdAt} format="D MMM YYYY" />
              </div>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <div className="mb-3 text-xl font-bold">{post.title}</div>
            <div className="text-sm text-neutral-600 ">{post.text}</div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={removeHandler}
              className="flex items-center justify-center gap-2  text-black opacity-50"
            >
              <AiFillDelete />
            </button>
            <button className="flex items-center justify-center gap-2  opacity-50">
              <Link to={`/${params.id}/edit`}>
                <AiTwotoneEdit />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
