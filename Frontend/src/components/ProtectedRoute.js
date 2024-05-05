import { useEffect, useState } from 'react';

const useRequireAuth = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If the token is not present, set the redirect state to true
    if (!token) {
      setRedirect(true);
    }
  }, []);

  return redirect; // Return the redirect state
};

export default useRequireAuth;
