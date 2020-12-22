import React, { useState } from "react";
import "./App.css";
import Spinner from "./Spinner.js"
import axios from "axios";

function App() {
  const [load,SetLoad] = useState(false)
  const [prob, SetProb] = useState("");
  const [age, setAge] = useState("");
  const [Class, setClass] = useState("");
  const [gender, SetGender] = useState(0);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!Boolean(age) || !Boolean(Class)   )
    {
      alert("Enter all the fields")
      return
    }

    SetLoad(true)


    if(Number(age) > 150 || Number(age) < 0)
    {
      alert("Critical outlier was detected, please try to be practical next time")
    }

    const response = await fetch(
      `https://arcane-basin-02731.herokuapp.com/${age}/${gender}/${Class}`
    );
   // console.log(response);
   if(response.ok){
     const data = await response.text();
  
      SetProb(Number(data).toFixed(3));
   }
    
    else{
      alert("Unknown Error")
    }
   
    SetLoad(false)
  };

  return (
    <div className="app">
      <div className="app__header">
        <h2>WHAT IF, YOU WERE IN TITANIC </h2>
      </div>

      <div className="app__body">
        <div className="app__container">

          <h2 className="app__desc">
          Fill up the form below to check your chance of getting survived, if you were in RMS Titanic.
        </h2>
        <form className="app__form">
          <input
            value={age}
            className="app__formfield"
            type="number"
            placeholder="Enter your age"
            min="0"
            
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="app__formgender">
            <input 
   
            aria-required={true}
            defaultChecked={true}
            type="radio" name="gender" onClick={() => SetGender(0)} />{" "}
            Male
            <br />
            <input
              
              aria-required={true}
              type="radio"
              name="gender"
              onClick={() => SetGender(1)}
            />{" "}
            Female
          </label>
          <select
            
            required = {true}
            className="app__formfield"
            value={Class}
            onChange={(e) => {
              setClass(e.target.value);
            }}
          >
            <option>Select Passenger Class</option>
            <option value={1}>First Class (around $1700 today)</option>
            <option value={2}>Second Class (around $699 today)</option>
            <option value={3}>Third Class (around($170-$460) today)</option>
          </select>
          <button className="app__formsubmit" onClick={handleSubmit}>
            Submit
          </button>
        </form>


       
        {(prob && (!load))? (
          <h1 className="app__result">
            You got {prob}% chance to get survied
          </h1>
        ):( (load)&&<Spinner/>)}
      </div>
        </div>
        
    </div>
  );
}

export default App;
