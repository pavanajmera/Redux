import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { calculateTotals } from "./features/cart/cartSlide";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const {cartItems} = useSelector((state)=>state.cart);
  const {isOpen} = useSelector((state) => state.modal);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  
  return(
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
