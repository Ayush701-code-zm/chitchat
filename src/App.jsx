import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
