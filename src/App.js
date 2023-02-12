import { SettingsApplications } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    // State of Products
    const [products, setProducts] = useState([]);

    // State of the check out cart
    const [cart, setCart] = useState({});

    // Fetch all Products and their info from API
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };

    // Fetch current cart items from API
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async(productId, quantity) => {
        const cartObject = await commerce.cart.add(productId, quantity);
        setCart(cartObject);
    };

    const handleUpdateCartQty = async(productId, quantity) => {
        const cart = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    };

    const handleRemoveFromCart = async(productId) => {
        const cart = await commerce.cart.remove(productId);

        setCart(cart);
    };

    const handleEmptyCart = async() => {
        const cart = await commerce.cart.empty();

        setCart(cart);
    };

    // Invoke functions when 
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    
    //commerce.cart.refresh();

    return (
        <Router>
                <Navbar totalItems={cart.total_items}/>
                <Routes>
                    <Route path="/" element={
                        <Products 
                        products={products} 
                        onAddToCart={handleAddToCart} />} 
                    />
                    <Route path="/cart" element={
                        <Cart 
                        cart={cart} 
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart} />} 
                    />
                    <Route path="/checkout" element={
                        <Checkout cart={cart} /> }
                    />
                </Routes>    
        </Router>
    );
};

export default App