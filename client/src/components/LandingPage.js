import React from 'react';
import heroImage from '../assets/img/pizza-hero.jpg'
import Navbar from "./pages/Navbar";

const LandingPage = () => {
    return(
        <>
            <Navbar/>
        <div className="landing-page-container">
            <div className="hero-text">
                <h1 className="font-48">
                    <span className="text-brand">Best</span> Pizzas in town.
                </h1>
                <p className="font-18">Try them and you&apos;ll keep coming back</p>
                <a className="brand-btn" href={"/menu"}>Menu</a>
            </div>
            <img src={heroImage} alt="hero"/>
        </div>
            </>
    );
}
export default LandingPage;