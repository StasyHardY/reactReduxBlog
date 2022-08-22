/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';

export function PostItem({ post }) {
  if (!post) {
    return (
      <div className="text-white text-xl flex justify-center text-center py-10">
        <LineWave
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div> // Добавить loader
    );
  }
  return (
    <Link to={`/${post._id}`}>
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
            <div className="text-sm text-neutral-600 line-clamp-3 ">
              {post.text}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
