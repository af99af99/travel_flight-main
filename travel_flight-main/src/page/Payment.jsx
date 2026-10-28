import React, { useContext, useEffect, useState } from "react";
import master from "src/assets/mc.jpg";
import visa from "../assets/visa.jpg";
import bkash from "src/assets/bkash.jpg";
import rock from "src/assets/rocket.jpg";
import nagad from "src/assets/nogod.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { flightDataContext } from "src/context/context";
import api from 'src/services/api';

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, setData } = useContext(flightDataContext);
    const [selectedPayment, setSelectedPayment] = useState("Master Card");
    const [formData, setFormData] = useState({});

            // cardNumber: "",
        // expiryMonth: "",
        // expiryYear: "",
        // cvv: "",
        // cardHolderName: "",
        // mobileNumber: "",
        // transactionId: "",  /member/frontendrequest


    useEffect(()=>{
      if (selectedPayment === "Bkash" || selectedPayment === "Nogod") {
        // Log only mobile number and transaction ID for Bkash and Nagad
        setFormData({
            paymentMethod: selectedPayment,
            mobileNumber: '',
            transactionId: '',
        });
    } else {
        // Log full card details for card payments
        setFormData({
            paymentMethod: selectedPayment,
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            cardHolderName: '',
        });
    }
    }, [selectedPayment])

    // card or mobile payment
    const isCardPayment =
        selectedPayment === "Master Card" || selectedPayment === "Visa Card";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setData((prev) => ({
            ...prev,
            payments: {
                ...formData,
            },
        }));

        try {
            const finaldata = await api.post('/member/frontendrequest', data);
            console.log(finaldata);
            if(finaldata) {
                navigate(`/bookingsuccess/${id}`);
            }
        } catch (error) {
            console.error('Passenger Data Input failed', error);
        }
    };
    console.log("data", data);
    return (
        <div className="flex text-teal-700 font-semibold space-x-6 bg-purple-50 p-6 rounded-lg h-[80vh]">
            {/* Payment Method Selection */}
            <div className="w-1/4">
                <h3 className="font-semibold text-lg mb-4">
                    Select Payment Method
                </h3>
                <div className="space-y-4">
                    {[
                        { label: "Master Card", icon: master },
                        { label: "Visa Card", icon: visa },
                        { label: "Bkash", icon: bkash },
                        { label: "Nogod", icon: nagad },
                        { label: "Rocket", icon: rock },
                    ].map((method) => (
                        <label
                            key={method.label}
                            className={`flex items-center space-x-3 cursor-pointer px-2 py-4 rounded-lg
              ${selectedPayment === method.label && "bg-teal-300"}
            `}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.label}
                                checked={selectedPayment === method.label}
                                onChange={() =>
                                    setSelectedPayment(method.label)
                                }
                                className="hidden form-radio h-5 w-5 text-green-700 focus:ring-green-700 border-gray-300"
                            />
                            <span className="text-black">{method.label}</span>
                            <img
                                src={method.icon}
                                alt={method.label}
                                className="w-8 h-8"
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Payment Form Section */}
            <div className="w-3/4 bg-white p-6 rounded-lg shadow-md h-fit">
                <form onSubmit={handleSubmit}>
                    {isCardPayment ? (
                        // Card Payment Form
                        <div>
                            <h3 className="font-semibold mb-4">We accept</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-black">
                                        Card Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        placeholder="xxxx xxxx xxxx xxxx"
                                        className="w-full border p-2 rounded text-black"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <div>
                                        <label className="block mb-1 text-black">
                                            Expiry Date *
                                        </label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                name="expiryMonth"
                                                value={formData.expiryMonth}
                                                onChange={handleChange}
                                                placeholder="Month"
                                                className="w-20 border p-2 rounded text-black"
                                            />
                                            <input
                                                type="text"
                                                name="expiryYear"
                                                value={formData.expiryYear}
                                                onChange={handleChange}
                                                placeholder="Year"
                                                className="w-20 border p-2 rounded text-black"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-black">
                                            CVV/CVC *
                                        </label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            placeholder="xxx"
                                            className="w-full border p-2 rounded text-black"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-black">
                                        Card holder name *
                                    </label>
                                    <input
                                        type="text"
                                        name="cardHolderName"
                                        value={formData.cardHolderName}
                                        onChange={handleChange}
                                        placeholder="Name on card"
                                        className="w-full border p-2 rounded text-black"
                                    />
                                </div>
                                <button className="mt-6 bg-teal-700 text-white py-2 px-6 rounded-lg">
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Mobile Payment Form
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-black">
                                        Mobile Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                        className="w-full border p-2 rounded text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-black">
                                        Transaction ID *
                                    </label>
                                    <input
                                        type="text"
                                        name="transactionId"
                                        value={formData.transactionId}
                                        onChange={handleChange}
                                        placeholder="Transaction ID"
                                        className="w-full border p-2 rounded text-black"
                                    />
                                </div>
                                <button className="mt-6 bg-teal-700 text-white py-2 px-6 rounded-lg">
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Payment;
