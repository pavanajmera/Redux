import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const CartContainer = () => {
    const {cartItems, total, amount} = useSelector((store)=> store.cart)
    // console.log({cartItems, total, amount})
    
    if(amount < 1){
        return(
            <section className="cart">
                <header>
                    <h2>your bag</h2>
                    <h4 className="empty-cart">is currently empty</h4>
                </header>
            </section>
        );
    }

    return(
        <section className="cart">
            <header>
                <h2>your bag</h2>
            </header>
            <div>
            {cartItems.map((item) => {
                return <CartItem key={item.id} {...item} />;
            })}
            </div>
        </section>
    );
};

export default CartContainer;