import React, { useState } from "react";
import apiClient from "src/services/api";

const useApiService = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Data
    const fetchData = async (endpoint, id = null) => {
        setLoading(true);
        setError(null);
        try {
            const url = id ? `${endpoint}/${id}` : endpoint; 
            const response = await apiClient.get(url);
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    // Create Data
    const createData = async (endpoint, payload) => {
        setError(null);
        try {
            const response = await apiClient.post(endpoint, payload);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Update Data
    const updateData = async (endpoint, payload) => {
        setError(null);
        try {
            const response = await apiClient.put(endpoint, payload);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Delete Data
    const deleteData = async (endpoint) => {
        setError(null);
        try {
            const response = await apiClient.delete(endpoint);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        data,
        loading,
        setLoading,
        error,
        fetchData,
        createData,
        updateData,
        deleteData,
    };
};

export default useApiService;
