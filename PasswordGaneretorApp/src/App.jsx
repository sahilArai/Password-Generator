import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const[Password, setPassword] = useState("");
  const[length, setLength] = useState(8);
  const[numAllowed, setNumAllowed] = useState(false);
  const[charAllowed, setcharAllowed] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    if (numAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += `~!@#$%^&*()_+-=[]{}|;':",./<>?`
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)
    
  } , [length,numAllowed,charAllowed])
  
  useEffect(()=>{
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])

  const PasswordRef = useRef(null);
  let copyPassword = () => {
    window.navigator.clipboard.writeText(Password);
    PasswordRef.current?.select()
  }
  const handleButtonPress = () => {
    setIsButtonActive(true);
  };

  const handleButtonRelease = () => {
    setIsButtonActive(false);
  };
  
  return (
    <>
     <div className="bg-slate-800 min-h-10 w-2/6 text-center rounded-xl p-4  text-orange-500">
      <h1 className="text-white text-2xl mb-3">Password Generator</h1>
      <div className="flex gap-1 justify-center">
        <input type="text"
        value={Password}
        placeholder="Password"
        ref={PasswordRef}
        className="rounded outline-yellow-50 w-5/6 p-1 "
        />
        <button 
          type="button"
          className={`bg-blue-500 font-bold rounded p-1.5 text-white ${
            isButtonActive ? "active" : ""
           }`}
          onClick={copyPassword}
           onMouseDown={handleButtonPress}
           onMouseUp={handleButtonRelease}
           onMouseLeave={handleButtonRelease}
          > Copy </button>
      </div>
      <div className="m-4 flex gap-4 align-middle">
        <div className="flex align-middle gap-1">

          <input type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer w-24"
            onChange={(e) => (setLength(e.target.value))}
          />
          <label className="font-medium">Length: {length}</label>
        </div>
        <div>

          <input type="checkbox" 
          onChange={() => {setNumAllowed((prev) => !prev)}}
          />
          <label className="font-medium gap-2"> Numbers</label>
        </div>
        <div>

          <input type="checkbox" 
          onChange={() => {setcharAllowed((prev) => !prev)}}
          />
          <label className="font-medium gap-2"> Charector</label>
        </div>
      </div>
     </div>

    </>
  );
}

export default App;
