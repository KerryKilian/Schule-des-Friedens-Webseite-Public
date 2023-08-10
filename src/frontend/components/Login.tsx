import React, { useState } from "react";

export default function Login() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="blurred-background">
      {isFormOpen && (
        <div className="centered-form">
          <form>
            {/* Your form content goes here */}
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      <button onClick={toggleForm}>
        {isFormOpen ? "Close Form" : "Open Form"}
      </button>
    </div>
  );
}
