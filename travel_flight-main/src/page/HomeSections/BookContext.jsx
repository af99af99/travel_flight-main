import React from "react";
import planeimm from "src/assets/tree.jpg";

const BookContext = () => {
    return (
        <div>
            <div
                className="flex gap-10 items-center  mt-5 p-5 rounded-xl"
                style={{ width: "100%" }}
            >
                {/* Image Section */}
                <div
                    className="rounded-xl"
                    style={{
                        backgroundImage: `url(${planeimm})`,
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        height: "300px",
                        width: "510px",
                    }}
                ></div>

                {/* Text Section */}
                <div className="ml-5  bg-none">
                    <h3 className="text-teal-700 font-bold text-[22px]">
                        Seamless travel made easy
                    </h3>
                    <p className="text-gray-600 font-semibold text-[18px]">
                        Book and manage flights on the go. Jet off on exclusive
                        fares. Enjoy unlimited access to digital content. Travel
                        seamlessly with the flightexpert.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookContext;
