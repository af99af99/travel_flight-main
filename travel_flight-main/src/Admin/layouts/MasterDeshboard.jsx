import React from 'react';
import { Outlet } from 'react-router-dom';

const MasterDeshboard = ({children}) => {
    return (
        <div className='master-page'>
            <header className='header-root'>
                <h2>Top Profile nev</h2>         
            </header>
            <section>
                <h2>Side Nevbar</h2>
            </section>
            <main>
                <Outlet />
            </main>
            <footer>
                <h2>Copy write by @ Pranta barua</h2>
            </footer>
        </div>
    );
};

export default MasterDeshboard;