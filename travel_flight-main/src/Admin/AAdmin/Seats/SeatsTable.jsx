import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useApiService from "src/services/useApiService";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Notification from 'src/hooks/Notification';

const SeatsTable = () => {
    const [tableData, setTableData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");

    const route = {
        seats: "/seats",
    };

    // API service
    const {
        data: seatsData,
        error: seatsError,
        fetchData: fetchSeatsData,
        deleteData: deleteSeatsData,
    } = useApiService();


    useEffect(() => {
        fetchSeatsData(route.seats);

        const intervalId = setInterval(() => {
            fetchSeatsData(route.seats);
        }, 30000); 

        return () => clearInterval(intervalId); 
    }, [route.seats]);

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
            navigate(`/admin${route.seats}/${id}`);
        } else if (action === "Delete") {
            const confirm = window.confirm("Are you sure you want to Delete this seat?");
            if (confirm) {
                try {
                    await deleteSeatsData(`${route.seats}/${id}`);
                    setNotificationMessage("Delete Successful");
                    fetchSeatsData(route.seats);
                } catch (error) {
                    setNotificationMessage("Error deleting seat.");
                }
            }
        }
        handleMenuClose();
    };

    const handleDeleteSelected = async () => {
        const confirm = window.confirm("Are you sure you want to delete the selected rows?");
        if (confirm) {
            try {
                for (let row of selectedRows) {
                    await deleteSeatsData(`${route.seats}/${row.id}`);
                }
                setNotificationMessage("Selected rows deleted successfully.");
                setSelectedRows([]);
                fetchSeatsData(route.seats);
            } catch (err) {
                setNotificationMessage("Error deleting selected rows.");
            }
        }
    };

    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows);
    };

    const columns = [
        {
            name: "Seat ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Flight ID",
            selector: (row) => row.flight_id,
            sortable: true,
        },
        {
            name: "Seat Number",
            selector: (row) => row.seat_number,
            sortable: true,
        },
        {
            name: "Class",
            selector: (row) => row.class,
            sortable: true,
        },
        {
            name: "Availability",
            selector: (row) => (row.availability ? "Available":"Not Available"),
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
                        <MenuItem onClick={() => handleAction("Edit", row.id)}>
                            Show & Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleAction("Delete", row.id)}>
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white p-5 rounded h-[60vh]">
            {seatsError && <p>{seatsError}</p>}
            {seatsData ? (
                <>
                    {/* Button to delete selected rows */}
                    <button
                        className="rounded"
                        onClick={handleDeleteSelected}
                        disabled={selectedRows.length === 0}
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            backgroundColor: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Delete Selected
                    </button>

                    <DataTable
                        title="Seats Data"
                        columns={columns}
                        data={seatsData}
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

export default SeatsTable;
