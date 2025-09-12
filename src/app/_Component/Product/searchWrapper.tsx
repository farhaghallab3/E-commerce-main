'use client';

import { Suspense } from 'react';
import SearchInput from './SearchComponent';
 

export default function SearchInputWithSuspense() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center w-full">
        <input 
          type="search" 
          className='w-3/4 max-w-md mx-auto rounded-md p-2 bg-gray-100 border m-4 border-gray-300 focus:outline-none focus:border-blue-500' 
          placeholder='search by product name'
          disabled
        />
      </div>
    }>
      <SearchInput />
    </Suspense>
  );
}