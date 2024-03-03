// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to Zithara Customer Management Application</h1>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3300/customers');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="desc">Sort by Date (desc)</option>
        <option value="asc">Sort by Date (asc)</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.sno}>
              <td>{item.sno}</td>
              <td>{item.customer_name}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.location}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>{new Date(item.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>







     





    </div>
    
    
  );
};

export default App;