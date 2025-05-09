import React from 'react';

function Form() {
  const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        {children}
    </form>
);
  return (
    <div>
      <form>
        <label>email</label>
        <input type='email'></input>
      </form>
      </div>
  )
}

export default Form

