import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-surface)',
            padding: 'var(--spacing-2xl) var(--spacing-xl)',
            marginTop: 'auto'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-xl)',
                textAlign: 'left'
            }}>
                {/* Section À propos */}
                <div>
                    <h3 style={{
                        fontSize: '1.2rem',
                        marginBottom: 'var(--spacing-md)',
                        fontFamily: 'var(--font-display)'
                    }}>
                        🎄 Noël Magique
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.6 }}>
                        Des mini-jeux festifs pour toute la famille.
                        Profitez de l'ambiance des fêtes avec nos jeux gratuits et amusants !
                    </p>
                </div>

                {/* Section Liens */}
                <div>
                    <h3 style={{
                        fontSize: '1.2rem',
                        marginBottom: 'var(--spacing-md)',
                        fontFamily: 'var(--font-display)'
                    }}>
                        Liens Utiles
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>
                                🏠 Accueil
                            </Link>
                        </li>
                        <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <Link to="/legal" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>
                                📄 Mentions Légales
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Section Contact */}
                <div>
                    <h3 style={{
                        fontSize: '1.2rem',
                        marginBottom: 'var(--spacing-md)',
                        fontFamily: 'var(--font-display)'
                    }}>
                        Contact
                    </h3>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            📧 Email: <a href="mailto:contact@keztechnologie.com" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>contact@keztechnologie.com</a>
                        </p>
                        <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            🌐 Web: <a href="https://keztechnologie.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>keztechnologie.com</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Barre de copyright */}
            <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                marginTop: 'var(--spacing-xl)',
                paddingTop: 'var(--spacing-lg)',
                textAlign: 'center',
                fontSize: '0.9rem',
                opacity: 0.8
            }}>
                <p>
                    © 2025 <strong>Kez Technologie</strong> - Tous droits réservés | Fait avec ❤️ pour les fêtes
                </p>
            </div>
        </footer>
    );
};

export default Footer;
