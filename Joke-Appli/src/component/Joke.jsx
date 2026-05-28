import { useEffect, useState } from "react";

const Joke = () => {
    const [joke, setJoke] = useState([]);
    const[jk,setJk] = useState({});
    
    useEffect(() => {
        const getJoke = async () => {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?amount=10");
        const data = await response.json();
        setJoke(data.jokes);
        console.log(joke);
       };
        getJoke()
        
    }, []);
    const random=()=>{
        const randomIndex = Math.floor(Math.random() * joke.length);
        setJk(joke[randomIndex]);
    }
    
    return (
        <>
            <h1 className="display-4 text-center p-4 bg-secondary">Joke Generator</h1>
            <p className="lead text-center">Click the button below to get a random joke!</p>
            <div className="d-flex justify-content-center">
            {jk.type == "single" ? (
                <p>{jk.joke}</p>
            ) : (
                <>
                    <p>{jk.setup}</p>
                    <p>{jk.delivery}</p>
                </>
            )}</div>
            <div className="d-flex justify-content-center">
            <button className="btn text-center justify-content-center mx-auto btn-primary btn-lg" onClick={random}>Get Joke</button>
            </div>
        </>

    )
}
export default Joke;