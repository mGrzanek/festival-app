import { useState, useEffect } from "react";

const PriceInfo = ({day, price, workshops}) => {
    const [concertDay, setConcertDay] = useState('');

    useEffect(() => {
        if(day === 1){
            setConcertDay('one');
        } else if(day === 2){
            setConcertDay('two');
        } else if(day === 3){
            setConcertDay('three');
        } else return(<p>Something went wrong...</p>);
    }, [day]);

    return(
        <>
            <h2>Day {concertDay}</h2>
            <p>Price: {price}</p>
            <p>Workshops: {workshops}</p>
        </>
    );
};

export default PriceInfo;