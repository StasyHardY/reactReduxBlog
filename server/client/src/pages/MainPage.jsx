/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import { PostItem } from '../components/PostItem';
import { getAllPosts } from '../redux/features/post/postSlice';

export function MainPage() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [value, setValue] = useState('');

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()));

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="text-white text-xl text-center py-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {filteredPosts?.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
        <div className="basis-1/8">
          <div className=" uppercase text-black text-lg">
            <div className="flex justify-center  items-center">
              {' '}
              <input
                onChange={(e) => setValue(e.target.value)}
                className="px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded-xl m-0
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
