import { gql, useQuery } from '@apollo/client';
import React from 'react';
import cardimage from "../assets/card-image.jpg"
import "../styles/Student/Canteencard.css"
import Student from './Student';

const GET_CANTEEN = gql`query GetCanteen {
    canteen_email {
        canteen_name
      owner_email
    }
  }`
export default function Canteencards() {
    const { data, loading, error } = useQuery(GET_CANTEEN);
    if (loading) return "Loading..";
    if (error) return `Error! ${error.message}`
    const canteenEmail = data?.canteen_email;

    const cardChoose = (email) => {
        console.log(email);
        // Return Student page with canteen email as a prop
        return <Student email={email} />
    }
    return (
        <div className='row'>

            {canteenEmail.map((canteen) => (
                <div className="col-lg-6 col-md-6" onClick={() => { cardChoose(canteen.owner_email) }}>
                    <div className="card bg-transparent">
                        <img src={cardimage} className="card-img" alt="" />
                        <div className="card-img-overlay">
                            <h2 className="card-title" >{canteen.canteen_name}</h2>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
