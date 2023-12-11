// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex items-center justify-center h-20 w-full text-black border-b">
      <ul className="flex justify-around">
        <li className='px-12'>
          <Link to="/create" className='bg-[#19c249] text-white p-2 rounded-md font-semibold'>Create survey</Link>
        </li>
        <li className='px-12'>
          <Link to="/" className='bg-[#19c249] text-white p-2 rounded-md font-semibold'>Average survey results</Link>
        </li>
        <li className='px-12'>
          <Link to="/surveys" className='bg-[#19c249] text-white p-2 rounded-md font-semibold'>Survey list</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
