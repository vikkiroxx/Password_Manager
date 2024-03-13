  import "./App.css";
  import { useState, useEffect } from "react";
  import Axios from "axios";

  function App() {
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [displayedPasswordId, setDisplayedPasswordId] = useState(null); 

    useEffect(()=>{
      Axios.get("http://localhost:3001/showpasswords").then((response)=>{
        setPasswordList(response.data);
      })
    }, []);

    const addPassword = () => {
      Axios.post("http://localhost:3001/addpassword", {
        password: password,
        title: title,
      }).then(() => {
        // Refresh the password list after adding a new password
        Axios.get("http://localhost:3001/showpasswords").then((response) => {
          setPasswordList(response.data);
        });
      });
    };

    const decryptPassword = (encryption) =>{
      Axios.post("http://localhost:3001/decryptPassword", {
        password: encryption.password, 
        iv: encryption.iv
      }).then((response)=>{
        console.log('Decrypted password:', response.data);
        setPasswordList(passwordList.map((val)=>{
          return val._id === encryption.id 
          ? {
            ...val,
            decryptedPassword: response.data,
          } 
          : val
        }));
        setDisplayedPasswordId(encryption.id);
      });
    };

    return (
      <div className="App">
        <div className="AddingPassword">
          <input
            type="text"
            placeholder="Ex. password123"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Ex. Facebook"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button onClick={addPassword}> Add Password</button>
        </div>
  
        <div className="Passwords">
          {passwordList.map((val) => {
            return (
              <div
                className="Password"
                onClick={() => {
                  decryptPassword({
                    password: val.password,
                    iv: val.iv,
                    id: val._id,
                  });
                }}
                key={val._id} 
              >
                <h3>{val.title}</h3>
                {displayedPasswordId === val._id && (
                <p>{` : ${val.decryptedPassword || "Decrypting..."}`}</p>
              )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  export default App;
