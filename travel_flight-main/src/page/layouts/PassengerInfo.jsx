import React, { useEffect, useState } from "react";
import ReviewBooking from "src/components/traveller_details/ReviewBooking";
import DataContextMaster from "src/page/layouts/DataContextMaster";
import PriceReceipt from "src/components/traveller_details/PriceReceipt";

const PassengerInfo = ({ flightID, children }) => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            // Set the scroll threshold here (in pixels)
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
            <div className="container-root">
                <div className="grid grid-flow-col gap-7">
                    <div className="col-span-10">
                        <ReviewBooking />
                        {children}
                    </div>
                    <div className="col-span-2">
                        <PriceReceipt isSticky={isSticky} />
                    </div>
                </div>
            </div>
    );
};

export default PassengerInfo;
