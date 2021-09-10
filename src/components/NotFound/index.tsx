import * as React from 'react';
import { Link } from 'react-router-dom';
import emptyImage from '../../assets/empty.png';

export default function NotFound() {
  return (
    <div className="page-container p-8 md:p-16">
      <div className="flex flex-col items-center justify-center bg-white rounded flex-grow px-8 py-16">
        <img src={emptyImage} width={102} aria-hidden />
        <p className="font-bold text-lg mt-9 text-center">The page you visited does not exist</p>
        <p className="text-small text-center max-w-[44ch] mt-3">
          Click the button below to go back to the home page
        </p>
        <Link to="/" className="btn primary mt-6">
          Go Home
        </Link>
      </div>
    </div>
  );
}
