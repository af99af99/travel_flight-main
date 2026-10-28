import React from 'react';
import Navbar from "src/components/Navbar";
import Footer from 'src/components/Footer';
import { Outlet } from 'react-router-dom';
import DataContextMaster from './DataContextMaster';

const Master = ({children}) => {
    return (
        <div className='master-page'>
            <header className='header-root'>
                <Navbar/>             
            </header>
            <main>
            <DataContextMaster>
                <Outlet />
            </DataContextMaster>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Master;