import React from "react";
import HomeHero from "./HomeSections/HomeHero";
import Slider from "./HomeSections/slider";
import FlyApp from "./HomeSections/FlyApp";
import BookContext from "./HomeSections/BookContext";
import CarouselDefault from "src/components/CarouselDefault";

const Home = () => {
    return (
        <div>
            <HomeHero />
            <div id="slider-root">
                {/* <Slider /> */}
                <CarouselDefault />
            </div>

            <div id="fly-app-root">
                <FlyApp />
            </div>
            <div id="book-contaxt-root">
                <BookContext />
            </div>
        </div>
    );
};

export default Home;
