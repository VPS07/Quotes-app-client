import Card from "./Card";
import Loading from "./Loading";
import { useContext } from "react";
import { CardContext } from "../App";



export default function Cards() {

  const { quotes } = useContext(CardContext);


  return (
    <>
      {quotes.length === 0 ? <Loading /> : <div className="container">
        {quotes.map((data) => (
          <Card
            key={data._id}
            name={data.name}
            quote={data.quote}
            id={data._id}
          />
        ))}
      </div>}
    </>
  );
}
