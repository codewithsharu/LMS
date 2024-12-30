import React from 'react';
import { useSelector } from 'react-redux';

const Debug = () => {
  const auth = useSelector(state => state.auth);

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, padding: '10px', background: '#f5f5f5' }}>
      <pre>
        {JSON.stringify(auth, null, 2)}
      </pre>
    </div>
  );
};

export default Debug; 