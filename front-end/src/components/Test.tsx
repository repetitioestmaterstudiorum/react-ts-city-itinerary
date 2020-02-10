import React, { useContext } from "react";
import { CityContext } from "../context/CityContext";

// game plan
/* 
1. use fetch in CityContext
2. create add new city component and add it here
3. add this useContext thing to Cities, replace axios 
4. add the add city button to Cities, somehow
*/

const Test: React.FC = () => {
  const contextTest = useContext(CityContext);

  return (
    <div className="conatiner pt-3 pl-3 text-center">
      <h1>Test</h1>
      <h2 className="pt-1 pb-1">contextTest.length: {contextTest.length}</h2>
      {contextTest.map((element, index) => (
        <p key={element._id}>
          {index + 1}: <strong>{element.name}</strong>, {element.country}
        </p>
      ))}
    </div>
  );
};

export default Test;
