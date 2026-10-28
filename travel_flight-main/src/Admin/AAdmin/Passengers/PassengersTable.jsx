import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useApiService from "src/services/useApiService";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Notification from 'src/hooks/Notification';


const PassengersTable = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]); 

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const route = {
        passengers: "/passengers",
    };
    const { data, error, fetchData, deleteData } = useApiService();


    useEffect(() => {
        fetchData(route.passengers); // Initial data fetch when the component loads

        // Setting up interval to fetch data every 30 seconds (example)
        const intervalId = setInterval(() => {
            fetchData(route.passengers);
        }, 30000); // Poll every 30 seconds for live data

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, [route.passengers]);

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
            navigate(`/admin${route.passengers}/${id}`);
        } else if (action === "Delete") {
            const confirm = window.confirm("Are you sure you want to Delete data?");
            if (confirm) {
                try {
                    // Attempt to delete the item
                    await deleteData(`${route.passengers}/${id}`);
                    setNotificationMessage("Delete Successful"); 
                    fetchData(route.passengers); 
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
                    await deleteData(`${route.passengers}/${row.id}`);
                }
                setNotificationMessage("Selected rows deleted successfully.");
                setSelectedRows([]);
                fetchData(route.passengers); 
            } catch (err) {
                setNotificationMessage("Error deleting selected rows.");
            }
        }
    };

    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows); // Update selected rows state
    };
/* 
 'reservation_id' => 'required|integer',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'passport_number' => 'numeric',
            'nationality' => 'required|integer',
*/
    const columns = [
        {
            name: "Passenger ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Reservation ID",
            selector: (row) => row.reservation_id,
            sortable: true,
        },
        {
            name: "First Name",
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.last_name,
            sortable: true,
        },
        {
            name: "Passport Number",
            selector: (row) => row.passport_number,
            sortable: true,
        },
        {
            name: "Nationality",
            selector: (row) => row.nationality,
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

export default PassengersTable;
