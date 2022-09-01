import React from "react";
import Student from "./Student";
import Cart from "../components/Cart";
import { CartProvider } from "react-use-cart";

function StudentHome() {
    return (
        <div>
            <CartProvider>
                <Student />
                <Cart />
            </CartProvider>
        </div>
    )
}

export default StudentHome;

