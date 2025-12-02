import React from 'react';

const Legal = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-lg)' }}>Mentions Légales</h2>

            <h3 style={{ marginTop: 'var(--spacing-lg)' }}>Éditeur du site</h3>
            <p>
                Ce site "Noël Magique" est édité par <strong>Kez Technologie</strong>.
            </p>
            <p>
                Email : <a href="mailto:contact@keztechnologie.com" style={{ color: 'var(--color-primary)' }}>contact@keztechnologie.com</a><br />
                Site web : <a href="https://keztechnologie.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>keztechnologie.com</a>
            </p>

            <h3 style={{ marginTop: 'var(--spacing-lg)' }}>Données Personnelles</h3>
            <p>
                Aucune donnée personnelle n'est collectée par ce site. Les scores de jeux sont stockés localement sur votre appareil (localStorage) et ne sont jamais transmis à des serveurs externes.
            </p>

            <h3 style={{ marginTop: 'var(--spacing-lg)' }}>Propriété Intellectuelle</h3>
            <p>
                L'ensemble du contenu de ce site (textes, jeux, design) est la propriété de Kez Technologie. Toute reproduction ou utilisation sans autorisation est interdite.
            </p>

            <h3 style={{ marginTop: 'var(--spacing-lg)' }}>Cookies</h3>
            <p>
                Ce site n'utilise pas de cookies de suivi. Seul le stockage local (localStorage) est utilisé pour sauvegarder vos scores de jeux.
            </p>
        </div>
    );
};

export default Legal;
