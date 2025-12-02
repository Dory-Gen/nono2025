import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Snowfall from './Snowfall';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Snowfall />
            <Header />
            <main style={{ flex: 1, padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
