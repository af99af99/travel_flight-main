import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useApiService from "src/services/useApiService";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Notification from 'src/hooks/Notification';


const AirlinesTable = () => {
    const [tableData, setTableData] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]); 

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const route = {
        airline: "/airlinesindex",
        airlinemodify: "/airlines",
    };
    
    const { data: airlinesData, error: airlinesError, fetchData: fetchAirlinesData, deleteData: deleteAirlinesData } = useApiService();
    const { data: countriesData, error: countriesError, fetchData: fetchCountriesData } = useApiService();


    useEffect(() => {
        fetchAirlinesData(route.airline); 


        const intervalId = setInterval(() => {
            fetchAirlinesData(route.airline);
        }, 30000); 

        return () => clearInterval(intervalId); 
    }, [route.airline]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await fetchCountriesData(route.country);

    //             if (countriesData) {
    //                 setTableData((prev) => [
    //                     ...prev,
    //                     ...countriesData, 
    //                 ]);
    //             }
    //         } catch (err) {
    //             console.error("Error fetching countries data:", err);
    //         }
    //     };

    //     fetchData();
    // }, [route.country, fetchCountriesData, countriesData]);
    

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
            navigate(`/admin${route.airlinemodify}/${id}`);
        } else if (action === "Delete") {
            const confirm = window.confirm("Are you sure you want to Delete data?");
            if (confirm) {
                try {
                    await deleteAirlinesData(`${route.airlinemodify}/${id}`);
                    setNotificationMessage("Delete Successful"); 
                    fetchAirlinesData(route.airline); 
                } catch (airlinesError) {
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
                    await deleteAirlinesData(`${route.airlinemodify}/${row.id}`);
                }
                setNotificationMessage("Selected rows deleted successfully.");
                setSelectedRows([]);
                fetchAirlinesData(route.airline); 
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
            name: "Airline ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Country",
            selector: (row) => row.countries_name,
            sortable: true,
        },
        {
            name: "Code",
            selector: (row) => row.code,
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
            {airlinesError && <p>{airlinesError}</p>}
            {airlinesData ? (
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
                    title="Airlines Data"
                    columns={columns}
                    data={airlinesData} 
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

export default AirlinesTable;


