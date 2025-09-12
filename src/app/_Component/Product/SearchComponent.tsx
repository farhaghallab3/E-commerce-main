 
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    if (searchParams) {
      setValue(searchParams.get('search') || '');
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        
        if (value.trim()) {
          params.set('search', value);
        } else {
          params.delete('search');
        }
        
        router.push(`?${params.toString()}`);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [value, router, searchParams, isLoading]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full">
        <input 
          type="search" 
          className='w-3/4 max-w-md mx-auto rounded-md p-2 bg-gray-100 border m-4 border-gray-300 focus:outline-none focus:border-blue-500' 
          placeholder='search by product name'
          disabled
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <input 
        type="search" 
        value={value}
        onChange={handleChange}
        className='w-3/4 max-w-md mx-auto rounded-md p-2 bg-gray-100 border m-4 border-gray-300 focus:outline-none focus:border-blue-500' 
        placeholder='search by product name'
      />
    </div>
  );
}