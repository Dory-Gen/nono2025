import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-surface)',
            padding: 'var(--spacing-md) var(--spacing-xl)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <span style={{ fontSize: '2rem' }}>🎄</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Noël Magique</h1>
            </Link>
            <nav>
                <ul style={{ display: 'flex', gap: 'var(--spacing-lg)', listStyle: 'none', margin: 0, padding: 0 }}>
                    <li><Link to="/" style={{ fontWeight: 600 }}>Accueil</Link></li>
                    <li><Link to="/#games" style={{ fontWeight: 600 }}>Jeux</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
