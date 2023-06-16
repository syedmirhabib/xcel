import { useContext } from 'react';
import { MyContext } from './path/to/context';

const SendingPage = () => {
  const { setValue } = useContext(MyContext);

  const handleClick = () => {
    setValue('Hello World');
  };

  return <button onClick={handleClick}>Send Value</button>;
};
export default SendingPage 