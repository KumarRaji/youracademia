import React from 'react';

const Card = ({ imageUrl, title, description, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
      {imageUrl && <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 flex-grow">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default Card;