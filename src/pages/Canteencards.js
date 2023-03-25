import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import cardimage from "../assets/card-image.jpg"
import "../styles/Student/Canteencard.css"

const GET_CANTEEN = gql`query GetCanteen {
    canteen_email {
        canteen_name
      owner_email
    }
  }`

export default function Canteencards() {
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_CANTEEN);

    if (loading) return "Loading..";
    if (error) return `Error! ${error.message}`

    const canteenEmail = data?.canteen_email;

    const cardChoose = (email, name) => {
        navigate(`/canteens/${name}`, { state: { email } });
    }

    return (
        <div>
        <h1 className="text-center">Canteens</h1>
        <h3 className="text-center">Choose your foodie fate, select your canteen mate!</h3>
        <div className='canteen-container' >
        <div className='row'>
            {canteenEmail.map((canteen) => (
                <div className="col-lg-6 col-md-6" onClick={() => { cardChoose(canteen.owner_email, canteen.canteen_name) }}>
                    <div className="card bg-transparent">
                        <img src={cardimage} className="card-img" alt="" />
                        <div className="card-img-overlay">
                            <h2 className="card-title" >{canteen.canteen_name}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        </div>
        </div>
    )
}
