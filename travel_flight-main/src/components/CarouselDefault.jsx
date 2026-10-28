import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import Sliderpic from "src/data/Sliderpic.json";

const CarouselDefault = () => {
    const [slideItem, setSlideItem] = useState(Sliderpic);

    // The slider data will be fatch form backend here

    return (
        <Carousel
            loop={true}
            autoplay={true}
            navButtonsProps={{
                style: {
                    opacity: 1,
                    backgroundColor: "transparent",
                },
            }}
        >
            {slideItem &&
                slideItem.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={`image ${index}`}
                        className="h-[500px] rounded-xl w-full object-cover object-center"
                    />
                ))}
        </Carousel>
    );
};

export default CarouselDefault;
