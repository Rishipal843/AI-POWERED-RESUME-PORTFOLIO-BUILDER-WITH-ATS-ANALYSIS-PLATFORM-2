import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
  const { search } = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(search).get('token');
    localStorage.setItem('token', token);
  }, []);

  return <h2>Login Successful</h2>;
}

export default Success;
