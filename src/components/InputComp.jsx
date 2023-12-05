import { useState, useRef, useEffect } from 'react';
import './InputComp.css';

const Input = ({name}) => {
  const [content, setContent] = useState(name);
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);

  const changeHandler = evt => {
    setContent(evt.target.value);
  };

  return (
    <wrapper is="custom">
      <span id="hide" ref={span}>{content}</span>
      <input 
        type="text" 
        style={{ width }} 
        value={content}
        onChange={changeHandler}
        maxLength={40} />
    </wrapper>
  );
};

export default Input;