import { useState, useEffect } from "react";

const PriceInfo = ({day, price, workshops}) => {
    const [concertDay, setConcertDay] = useState('');
    console.log('workshops', workshops);

    useEffect(() => {
        if(day === 1) setConcertDay('one');
        else if(day === 2) setConcertDay('two'); 
        else if(day === 3) setConcertDay('three');
        else return(<p>Something went wrong...</p>);
    }, [day]);

    return(
        <div className="alert alert-primary my-1 py-1 px-2 d-sm-flex flex-column justify-content-center align-items-center">
            <h2>Day {concertDay}</h2>
            <div className="d-flex flex-column justify-content-start w-75">
                <p><b>Price:</b> ${price}</p>
                <p><b>Workshops:</b> {workshops.map((workshop, index) => (
                        <span key={index}>
                            <i>"{workshop}"</i>{index < workshops.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default PriceInfo;