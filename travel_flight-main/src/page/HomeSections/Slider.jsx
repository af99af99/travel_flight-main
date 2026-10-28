import React from "react";
import Sliderpic from "src/data/Sliderpic.json";

const Slider = () => {
    return (
        <div className="mt-20">
            <div className="carousel w-full h-[340px]">
                {Sliderpic.map((item, index) => (
                    <div
                        id={`slide${index + 1}`}
                        key={index}
                        className="carousel-item relative w-full"
                    >
                        <img
                            src={item}
                            className="w-full"
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a
                                href={`#slide${
                                    index === 0 ? Sliderpic.length : index
                                }`}
                                className="btn btn-circle"
                            >
                                ❮
                            </a>
                            <a
                                href={`#slide${
                                    index === Sliderpic.length - 1
                                        ? 1
                                        : index + 2
                                }`}
                                className="btn btn-circle"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
