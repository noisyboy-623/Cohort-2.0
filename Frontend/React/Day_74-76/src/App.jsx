import React, { useState } from 'react'
import List from './components/List'
import Details from './components/Details';
import Card from './components/Card';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [imageURL, setImageURL] = useState('');

  const localData = JSON.parse(localStorage.getItem("usersData") || "[]");
  const [allUsers, setAllUsers] = useState(localData)
  const [showCard, setShowCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const eventHandler = (e) => {
    e.preventDefault();
    
    const newUser = {
      name,
      email,
      number,
      imageURL,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const oldUsers = [...allUsers];
    oldUsers.push(newUser);
    localStorage.setItem("usersData", JSON.stringify(oldUsers));
    setAllUsers(oldUsers);
    
    setName('');
    setEmail('');
    setNumber('');
    setImageURL('');
  }

  const deleteHandler = (idx) => {
      const copyUsers = [...allUsers];
      copyUsers.splice(idx, 1);
      setAllUsers(copyUsers);
      setShowCard(false);
      localStorage.setItem("usersData", JSON.stringify(copyUsers));
    }


  return (   
    <div className='parent'>
      <form onSubmit={(e)=>{
        eventHandler(e);
        alert('Form Submitted');
      }}>

        <input 
          type="text" 
          placeholder='Name'
          required 
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}/>

          <input 
          type="email" 
          placeholder='Email'
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }} />

          <input 
          type="number" 
          placeholder='Phone Number'
          required
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }} />

          <input 
          type="text" 
          placeholder='Image URL'
          required
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
          }} />

        <button type="submit">Submit</button>

      </form>

      <div className="list">
        {allUsers.map((user, idx) => (
          <Details
            key={idx}
            name={user.name}
            email={user.email}
            number={user.number}
            imageURL={user.imageURL}
            time={user.time}
            isLast={idx === allUsers.length - 1}
            onClick={() => {
              setShowCard(true); 
              setSelectedUser(user);
              setSelectedIndex(idx);
            }}
          />
        ))}
      </div>
      
        
      {showCard && (
        <div className="overlay" >
        <Card 
        user = {selectedUser}
        closeCard = {() => setShowCard(false)}
        removeCard = {() => {deleteHandler(selectedIndex)} }
        />
        </div>)}
    </div>
  )
}

export default App

