import { useContext, useEffect, useState } from 'react';
import { flightDataContext } from "src/context/context";
import useApiService from 'src/services/useApiService';

const useFlightData = (id) => {
    const { data } = useContext(flightDataContext); // Check if context has valid data
    const route = '/flightsdetails';
    const { data: flightsData, fetchData } = useApiService();
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('Flight ID is missing');
            return;
        }

        const fetchGetData = async () => {
            try {
                await fetchData(route, id);
            } catch (err) {
                console.error("Error fetching flight data:", err);
                setError('Failed to fetch flight data');
            }
        };

        fetchGetData();
    }, [id, route]);

    useEffect(() => {
        if (flightsData) {
            setFlightData(flightsData);
        }
    }, [flightsData]);

    if (error) {
        throw new Error(error);
    }

    if (!flightData) {
        return { flightData: null, loading: true };
    }

    return { flightData, loading: false };
};

export default useFlightData;
