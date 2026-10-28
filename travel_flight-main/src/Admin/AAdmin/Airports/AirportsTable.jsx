import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useApiService from "src/services/useApiService";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Notification from 'src/hooks/Notification';


const AirportsTable = () => {
    const [tableData, setTableData] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]); 

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const route = {
        airports: "/airportsindex",
        airportsmodify: "/airports",
    };
    
    const { data: airportsData, error: airportsError, fetchData: fetchAirportsData, deleteData: deleteAirportsData } = useApiService();


    useEffect(() => {
        fetchAirportsData(route.airports);

        const intervalId = setInterval(() => {
            fetchAirportsData(route.airports);
        }, 30000); 

        return () => clearInterval(intervalId); 
    }, [route.airports]);

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
            navigate(`/admin${route.airportsmodify}/${id}`);
        } else if (action === "Delete") {
            const confirm = window.confirm("Are you sure you want to Delete data?");
            if (confirm) {
                try {
                    await deleteAirportsData(`${route.airportsmodify}/${id}`);
                    setNotificationMessage("Delete Successful"); 
                    fetchAirportsData(route.airports); 
                } catch (airportsError) {
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
                    await deleteAirportsData(`${route.airportsmodify}/${row.id}`);
                }
                setNotificationMessage("Selected rows deleted successfully.");
                setSelectedRows([]);
                fetchAirportsData(route.airports); 
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
            name: "Airport Code",
            selector: (row) => row.airport_code,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "City",
            selector: (row) => row.city,
            sortable: true,
        },
        {
            name: "Country",
            selector: (row) => row.countries_name,
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
            {airportsError && <p>{airportsError}</p>}
            {airportsData && Array.isArray(airportsData) ? (
  <>
    {/* Button to delete selected rows */}
    <button
      className="rounded"
      onClick={handleDeleteSelected}
      disabled={selectedRows.length === 0} // Disable if no rows are selected
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
      title="Airports Data"
      columns={columns}
      data={airportsData}
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

export default AirportsTable;


