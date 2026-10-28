import React from 'react';
import PassengerInfo from './layouts/PassengerInfo';
import { useParams } from 'react-router-dom';

const Bookingsuccessful = () => {
  const {id} = useParams();
  // const { data, setData } = useContext(flightDataContext);
    return (
        <PassengerInfo flightID={id}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg p-6 bg-white border border-teal-200 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-teal-600 mb-4">Booking Successful!</h1>
          <p className="text-gray-700 mb-2">
            Your flight has been booked successfully! Your booking ID is <span className="font-semibold text-gray-900">FL912BIPZF610</span> and PNR is <span className="font-semibold text-gray-900">LA4ZXW</span>.
          </p>
          <p className="text-gray-700 mb-4">
            Please pay as soon as possible to confirm the ticket as prices may change anytime depending on seat availability. Afterwards, we will email you the confirm ticket on your registered email address.
          </p>
          <p className="text-gray-700 mb-2">
            For any assistance, please call us at <span className="font-semibold text-gray-900">+880-9617-111-888</span> or email us at <span className="font-semibold text-gray-900">sales@flightexpert.com</span>.
          </p>
        </div>
      </div>
      </PassengerInfo>
    );
  };

export default Bookingsuccessful;