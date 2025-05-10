import React from 'react';

const Header = ({ title }) => (
    <header className="bg-blue-500 w-full py-4 text-white text-center ">
        <h1 className="text-xl font-bold">{title}</h1>
    </header>
);

export default Header;
