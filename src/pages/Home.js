import React from "react";

function Home() {
  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
        SPS REACT TEST
      </h1>
  
      <div style={{ marginTop: '20px' }}>
        <a
          href="/users"
          style={{
            fontSize: '18px',
            color: '#4CAF50',
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: '2px solid #4CAF50',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#4CAF50';
          }}
        >
          Usuários
        </a>
      </div>
      
    </div>
  );
  
}

export default Home;
