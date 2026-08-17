import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getAverageAge } from './api';
import './App.css';

function App() {
  // State variables
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);
  const [averageAge, setAverageAge] = useState(null);

  // Fetches the users and average age from API when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
    fetchAverageAge();
  };

  // Fetch average age from API
  const fetchAverageAge = async () => {
    try {
      const result = await getAverageAge();
      setAverageAge(result[0]?.averageAge ?? null);
    } catch (error) {
      console.error('Error fetching average age:', error);
    }
  };

  // Called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, age: Number(age) };
    if (editId) {
      await updateUser(editId, user);
      setEditId(null);
    } else {
      await createUser(user);
    }
    setName('');
    setEmail('');
    setAge('');
    fetchUsers();  // Refresh the user list and average age
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();  // Refresh the user list and average age
  };

  return (
    <div className="App">
      <h1>MongoDB CRUD Operations</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update User' : 'Create User'}</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.age}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Average Age: {averageAge != null ? averageAge.toFixed(2) : 'N/A'}</h2>
    </div>
  );
}

export default App;
