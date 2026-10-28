import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useApiService from "src/services/useApiService";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Notification from 'src/hooks/Notification';


const FlightTable = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]); 

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const route = {
        flights: "/flightsindex",
        flightmodify: "/flights",
    };
    const { data, error, fetchData, deleteData } = useApiService();


    useEffect(() => {
        fetchData(route.flights); // Initial data fetch when the component loads

        // Setting up interval to fetch data every 30 seconds (example)
        const intervalId = setInterval(() => {
            fetchData(route.flights);
        }, 30000); // Poll every 30 seconds for live data

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, [route.flights]);

    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleAction = async (action, id) => {
        
        if (action === "Edit") {
            navigate(`/admin${route.flightmodify}/${id}`);
        } else if (action === "Delete") {
            const confirm = window.confirm("Are you sure you want to Delete data?");
            if (confirm) {
                try {
                    // Attempt to delete the item
                    await deleteData(`${route.flightmodify}/${id}`);
                    setNotificationMessage("Delete Successful"); 
                    fetchData(route.flights); 
                } catch (error) {
                    setNotificationMessage("Error deleting item");
                }
            }
        }
        handleMenuClose();
    };
    

    // Function to handle deletion of selected rows
    const handleDeleteSelected = async () => {
        const confirm = window.confirm("Are you sure you want to delete the selected rows?");
        if (confirm) {
            try {
                for (let row of selectedRows) {
                    await deleteData(`${route.flightmodify}/${row.id}`);
                }
                setNotificationMessage("Selected rows deleted successfully.");
                setSelectedRows([]);
                fetchData(route.flights); 
            } catch (err) {
                setNotificationMessage("Error deleting selected rows.");
            }
        }
    };

    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows); // Update selected rows state
    };

    const columns = [
        {
            name: "Flight ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Airline Name",
            selector: (row) => row.airline_name,
            sortable: true,
        },
        {
            name: "Flight Num",
            selector: (row) => row.flight_num,
            sortable: true,
        },
        {
            name: "Departure Airport",
            selector: (row) => row.departure_airport_code,
            sortable: true,
        },
        {
            name: "Arrival Airport",
            selector: (row) => row.arrival_airport_code,
            sortable: true,
        },
        {
            name: "Departure Time",
            selector: (row) => row.departure_time,
            sortable: true,
        },
        {
            name: "Arrival Time",
            selector: (row) => row.arrival_time,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.flight_status,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <IconButton
                        onClick={(e) => handleMenuClick(e, row)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open && selectedRow === row}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleAction("Edit", row.id)}>Show & Edit</MenuItem>
                        <MenuItem onClick={() => handleAction("Delete", row.id)}>Delete</MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];


    return (
        <div className="bg-white p-5 rounded h-[60vh]">
            {error && <p>{error}</p>}
            {data ? (
                <>
                {/* Button to delete selected rows */}
                <button
                    className="rounded"
                    onClick={handleDeleteSelected}
                    disabled={selectedRows.length === 0} // Disable if no rows are selected
                    style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" }}
                >
                    Delete Selected
                </button>

                <DataTable
                    title="Flights Data"
                    columns={columns}
                    data={data} // Pass the fetched data to the table
                    onSelectedRowsChange={handleRowSelected}  
                    selectableRows
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                />
                </>
            ) : (
                <p>No data available</p>
            )}
            {notificationMessage && <Notification message={notificationMessage} />}
        </div>
    );
};

export default FlightTable;
