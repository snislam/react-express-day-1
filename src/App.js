import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [users])

  const handlePostData = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    console.log(user);

    // send to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, user];
        setUsers(newUsers);
        console.log(data);
      });
  }

  return (
    <div className="App">
      <h1>I am in practise mood.</h1>
      <p>{users.length}</p>
      <div>
        <form onSubmit={handlePostData}>
          <input type="text" name="name" id="" placeholder='Name' required /> <br /> <br />
          <input type="email" name="email" id="" placeholder='Email' required /> <br /> <br />
          <input type="submit" value="Send to server" />
        </form>
      </div>
      <div>
        {
          users.map(user => <li key={user.id}>{user.id}, {user.name}, {user.email}</li>)
        }
      </div>
    </div>
  );
}

export default App;
