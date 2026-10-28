import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFlightData from "src/hooks/useFlightData";
import { flightDataContext } from "src/context/context";

const PriceReceipt = ({ isSticky }) => {
  const { id } = useParams();
  const { data, setData } = useContext(flightDataContext);
  const { flightData, loading } = useFlightData(id);

  const [booking, setBooking] = useState({
    adult: { passenger: 2, base_fare: 3130, fees: 988 },
    children: { passenger: 3, base_fare: 2347.34, fees: 851.67 },
    infant: { passenger: 1, base_fare: 313, fees: 248 },
  });

  const [maxHeight, setMaxHeight] = useState(window.innerHeight);

  // Update booking data based on API data
  useEffect(() => {
    if (data?.travelers && flightData?.price) {
      setBooking({
        adult: {
          passenger: data.travelers.adults || 0,
          base_fare: parseFloat(flightData.price) || 0,
          fees: 988,
        },
        children: {
          passenger: data.travelers.children || 0,
          base_fare: parseFloat(flightData.price) || 0,
          fees: 851.67,
        },
        infant: {
          passenger: data.travelers.infants || 0,
          base_fare: parseFloat(flightData.price) || 0,
          fees: 248,
        },
      });
    }
  }, [data, flightData]);

  // Adjust maxHeight on window resize
  useEffect(() => {
    const adjustHeight = () => {
      const remainingHeight = window.innerHeight - 200;
      setMaxHeight(Math.max(remainingHeight, 100));
    };

    if (isSticky) {
      window.addEventListener("resize", adjustHeight);
      adjustHeight(); // Initial adjustment
    }

    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, [isSticky]);

  // Calculate total payment
  const totalPayment = Object.entries(booking).reduce(
    (sum, [_, item]) => sum + (item.base_fare + item.fees) * item.passenger,
    0
  );

useEffect(()=> {
  setData((prev)=>({
    ...prev,
    totalPayment: totalPayment,
  }))
},[totalPayment])

  return (
    <div
      className={`card bg-white shadow-xl rounded-lg ${
        isSticky ? "sticky top-0 z-10" : ""
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-6">
        <figure>
          <img
            className="w-[50px] rounded-full"
            src="https://img.favpng.com/9/17/22/airplane-aircraft-aviation-logo-poster-png-favpng-J9PdkddGmnqazCTzCA1RjDaLP.jpg"
            alt="Image"
          />
        </figure>
        <p className="font-medium">{flightData?.airline_name || "N/A"}</p>
      </div>
      <hr />
      <div className="mt-1 text-start px-4 py-6">
        <h2 className="font-semibold text-lg mb-4">Fees Summary</h2>

        {/* Scrollable Div */}
        <div
          className="mt-2 overflow-y-scroll"
          style={{
            maxHeight: `${maxHeight}px`,
            paddingBottom: "4rem",
          }}
        >
          {Object.entries(booking).map(([key, item], index) => (
            <div key={index} className="voucher">
              <h2 className="font-medium mb-2">{`${key.charAt(0).toUpperCase() + key.slice(1)} (${item.passenger} traveler)`}</h2>

              <div className="flex justify-between">
                <p className="flex-none text-gray-700">Base Fare</p>
                <div className="price text-end">
                  <p className="text-sm">
                    BDT{" "}
                    <span className="text-lg font-semibold">
                      {item.base_fare.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-xs">{`(${item.passenger} x ${item.base_fare.toLocaleString()})`}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="flex-none text-gray-700">Taxes + Fees</p>
                <div className="price text-end">
                  <p className="text-sm">
                    BDT{" "}
                    <span className="text-lg font-semibold">
                      {item.fees.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-xs">{`(${item.passenger} x ${item.fees.toLocaleString()})`}</p>
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))}

          <div className="mb-4">
            <div className="flex justify-between">
              <p className="text-gray-700">Sub-total</p>
              <p className="text-sm">
                BDT{" "}
                <span className="text-lg font-semibold">
                  {totalPayment.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky total-pay Section */}
      <div
        className="total-pay bg-teal-200 px-4 py-6 sticky bottom-0 left-0"
        style={{ zIndex: 10 }}
      >
        <div className="flex justify-between">
          <p className="text-gray-700">{`You Pay  (for ${
            Object.values(booking).reduce((sum, item) => sum + item.passenger, 0)
          } Travelers)`}</p>
          <p className="text-sm">
            BDT{" "}
            <span className="text-lg font-semibold">
              {totalPayment.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceReceipt;
