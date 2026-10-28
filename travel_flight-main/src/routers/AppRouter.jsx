// src/routers/AppRouter.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "src/page/Home";
import FlightChoose from "src/page/FlightChoose";
import Master from "src/page/layouts/Master";

import Signin from "src/page/Signin";
import Travellerdetails from "src/page/Travellerdetails";
import EnterTraverlDetails from "src/page/EnterTraverlDetails";
import Bookingsuccessful from "../page/Bookingsuccessful";
import Payment from "src/page/Payment";
import Createaccount from "../page/Createaccount";
import TeamMember from "src/components/TeamMember";

// admin Page link part

import Admin from "../admin/layouts/Admin";

// views

import Dashboard from "src/admin/views/admin/Dashboard";
import Settings from "src/admin/views/admin/Settings";
import Tables from "src/admin/views/admin/Tables";
import Flights from "src/admin/AAdmin/Flights/Flights";
import FlightTable from "src/admin/AAdmin/Flights/FlightTable";
import Airlines from "src/admin/AAdmin/Airlines/Airlines";
import Airports from "src/admin/AAdmin/Airports/Airports";
import Passengers from "src/admin/AAdmin/Passengers/Passengers";
import Payments from "src/admin/AAdmin/Payments/Payments";
import Resarvation from "src/admin/AAdmin/Resarvation/Resarvation";
import Seats from "src/admin/AAdmin/Seats/Seats";
import AirlinesTable from "src/admin/AAdmin/Airlines/AirlinesTable";
import AirportsTable from "src/admin/AAdmin/Airports/AirportsTable";
import SeatsTable from "src/admin/AAdmin/Seats/SeatsTable";
import PassengersTable from "src/admin/AAdmin/Passengers/PassengersTable";
import PrivateRoute from "../services/PrivateRoute";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Outside the master Layout */}
                <Route path={"/signin"} element={<Signin />} />
                <Route path={"/account"} element={<Createaccount />} />
                {/* Inside the master Layout */}
                <Route element={<Master />}>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/chooseflight"} element={<FlightChoose />} />
                    <Route
                        path={"/travelerentery"}
                        element={<EnterTraverlDetails />}
                    />
                    <Route
                        path={"/travelerentery/:id"}
                        element={<EnterTraverlDetails />}
                    />
                    <Route
                        path={"/travelerdetails/:id"}
                        element={<Travellerdetails />}
                    />
                    <Route
                        path={"/bookingsuccess/:id"}
                        element={<Bookingsuccessful />}
                    />
                    <Route path={"/payment/:id"} element={<Payment />} />

                    <Route path={"/flight"} element={<Flights />} />
                    <Route path={"/team"} element={<TeamMember />} />
                </Route>

                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="settings" element={<Settings />} />

                    <Route path="flights" element={<Flights page="Create" />} />
                    <Route
                        path="flights/:id"
                        element={<Flights page="Edit" />}
                    />
                    <Route path="flights/table" element={<FlightTable />} />

                    <Route path="airlines" element={<Airlines />} />
                    <Route
                        path="airlines/:id"
                        element={<Airlines page="Edit" />}
                    />
                    <Route path="airlines/table" element={<AirlinesTable />} />

                    <Route path="airports" element={<Airports />} />
                    <Route
                        path="airports/:id"
                        element={<Airports page="Edit" />}
                    />
                    <Route path="airports/table" element={<AirportsTable />} />

                    <Route path="passengers" element={<Passengers />} />
                    <Route
                        path="passengers/:id"
                        element={<Passengers page="Edit" />}
                    />
                    <Route
                        path="passengers/table"
                        element={<PassengersTable />}
                    />

                    <Route path="payments" element={<Payments />} />
                    <Route path="resarvation" element={<Resarvation />} />

                    <Route path="seats" element={<Seats />} />
                    <Route path="seats/:id" element={<Seats page="Edit" />} />
                    <Route path="seats/table" element={<SeatsTable />} />

                    <Route path="tables" element={<Tables />} />
                </Route>
                {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
                <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
