import React from 'react';
import { Link } from 'react-router-dom';
import games from '../data/games.json';
import MusicPlayer from '../components/MusicPlayer';

const Home = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <section style={{ marginBottom: 'var(--spacing-2xl)', padding: 'var(--spacing-xl) 0', position: 'relative' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>
                    Bienvenue sur Noël Magique ! 🎅
                </h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-lg)' }}>
                    Plongez dans l'ambiance des fêtes avec nos mini-jeux amusants pour toute la famille.
                    C'est gratuit et sans inscription !
                </p>

                {/* Music Player in Hero Section */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
                    <MusicPlayer />
                </div>
            </section>

            <section id="games">
                <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xl)', color: 'var(--color-secondary)' }}>
                    Nos Jeux
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--spacing-xl)',
                    padding: 'var(--spacing-md)'
                }}>
                    {games.map((game) => (
                        <Link to={game.path} key={game.id} style={{ textDecoration: 'none' }}>
                            <div className="animate-pop" style={{
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--spacing-xl)',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderTop: `5px solid ${game.color}`,
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>{game.icon}</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text)' }}>
                                    {game.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-light)' }}>{game.description}</p>
                                <button style={{
                                    marginTop: 'var(--spacing-lg)',
                                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                                    backgroundColor: game.color,
                                    color: '#FFF',
                                    borderRadius: 'var(--radius-full)',
                                    fontWeight: 600
                                }}>
                                    Jouer
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
