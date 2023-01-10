import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "./config";
import "./App.css";
import Cards from "./components/Cards";
import Nav from "./components/Nav";
import { createContext } from "react";
import Addquote from "./components/Addquote";

export const CardContext = createContext(null);

function App() {
  const [quotes, setQuotes] = useState([]);

  function getData() {
    axiosInstance.get("/crudapp").then((res) => {
      setQuotes(res.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <CardContext.Provider
        value={{
          quotes,
          getData,
        }}
      >
        <Nav />
        <Addquote />
        <Cards />
      </CardContext.Provider>
    </div>
  );
}

export default App;
