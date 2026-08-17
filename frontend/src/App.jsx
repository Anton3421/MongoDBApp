import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api';
import './App.css';

function App() {
// State variables
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);

// Fetches the users from API when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

// Asynchronous request to the getUsers function from api.js
  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

// Called when the form is submitted
// Creates a user object with form input values
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, age: Number(age) };
// If objects editId-value is true, updateUser from api.js is called
    if (editId) {
      await updateUser(editId, user);
      setEditId(null);
    } else {
// Otherwise, call createUser from api.js
      await createUser(user);
    }
    setName('');
    setEmail('');
    setAge('');
// Call fetchUsers to refresh the user list
    fetchUsers();
  };

// Defines objects editId (true/false)
// Updates state-variables with the corresponding values from the clicked user object
  const handleEdit = (user) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  };

// Calls deleteUser from api.js
// After calling, call fetchUsers to refresh users list
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
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
    </div>
  );
}

export default App;
