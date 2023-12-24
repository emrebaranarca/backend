import React from 'react';

const Input = ({name,onChange,type}) => {
  return (
    <div>
      <input type={type} name='{name}' onChange={onChange} />
    </div>
  );
};

export default Input;