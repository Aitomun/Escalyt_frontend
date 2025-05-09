import React from 'react';

const Image = ({ src, alt }) => (
    <div className="my-4">
        <img src={src} alt={alt} className="mx-auto w-1/2" />
    </div>
);

export default Image;
