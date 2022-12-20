import React from 'react';
import cardimage from "../assets/card-image.jpg"
import "../styles/Student/Canteencard.css"

const data=[
    {
        name:"FOOD MASTI",
    },
    {
        name:"TADKA CANTEEN",
    },
    {
        name:"AMUL"
    },
    {
        name:"NESCAFE",
    }

]
export default function Canteencards() {
    const handleClick = () => {
        console.log("i am clicked");
    }
    return (
        <div className='row'>
        {data.map((canteen) => (
                <div className="col-lg-6 col-md-6" >
                    <div className="card bg-transparent" onClick={handleClick} >
                        <img src={cardimage} className="card-img" alt=""/>
                            <div className="card-img-overlay">
                                <h2 className="card-title" >{canteen.name}</h2>
                                
                            </div>
                    </div>
                </div>
        ))}


        </div>
    )
}
