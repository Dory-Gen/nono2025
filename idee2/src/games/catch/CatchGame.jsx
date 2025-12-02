import React, { useState, useEffect, useRef } from 'react';

const CatchGame = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef(null);
    const basketRef = useRef(null);

    // Game state refs to avoid closure staleness in loop
    const gameState = useRef({
        basketX: 50, // percentage
        items: [], // { id, x, y, type: 'gift' | 'coal' }
        score: 0,
        lastSpawn: 0,
        speed: 2
    });

    const requestRef = useRef();

    const startGame = () => {
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        gameState.current = {
            basketX: 50,
            items: [],
            score: 0,
            lastSpawn: 0,
            speed: 0.5 // Initial speed (percentage per frame approx)
        };
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const gameLoop = (time) => {
        if (!gameState.current) return;

        // Spawn items
        if (time - gameState.current.lastSpawn > 1000) { // Every 1 second
            gameState.current.items.push({
                id: Math.random(),
                x: Math.random() * 90 + 5, // 5% to 95%
                y: -10,
                type: Math.random() > 0.8 ? 'coal' : 'gift' // 20% chance of coal
            });
            gameState.current.lastSpawn = time;
            gameState.current.speed += 0.01; // Increase speed slightly
        }

        // Update items
        gameState.current.items = gameState.current.items.map(item => ({
            ...item,
            y: item.y + gameState.current.speed
        }));

        // Check collisions and removal
        const basketRect = basketRef.current?.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (basketRect && containerRect) {
            gameState.current.items = gameState.current.items.filter(item => {
                // If item goes off screen
                if (item.y > 100) {
                    return false;
                }

                // Collision detection (simplified)
                // Convert item % to pixels relative to container
                const itemPixelY = (item.y / 100) * containerRect.height;
                const itemPixelX = (item.x / 100) * containerRect.width;

                // Basket is at bottom, approx 10% height
                const basketTop = containerRect.height - 60; // Approx basket height
                const basketLeft = (gameState.current.basketX / 100) * containerRect.width - 25; // Centered
                const basketRight = basketLeft + 50;

                if (itemPixelY > basketTop && itemPixelY < containerRect.height &&
                    itemPixelX > basketLeft && itemPixelX < basketRight) {

                    if (item.type === 'gift') {
                        gameState.current.score += 10;
                        setScore(gameState.current.score);
                    } else {
                        gameState.current.score -= 5;
                        setScore(gameState.current.score);
                    }
                    return false; // Remove item
                }

                return true;
            });
        }

        // Render updates (force re-render or use refs for positions? Using refs for positions is better for performance but React needs state for rendering)
        // For this simple game, we'll force a re-render every frame by setting state or just use refs for positions and a separate state for rendering items?
        // Actually, setting state every frame might be jittery in React if not optimized.
        // Let's try setting a "tick" state or just updating the items state.
        // To avoid too many re-renders, we can update the DOM directly for items, but that's not "React-y".
        // We'll stick to React state for items for now, it should be fine for simple games.

        // HOWEVER, to avoid state lag, let's use a forceUpdate or just set the items state.
        // But we are inside the loop.

        // Let's use a ref for the items and only update React state for Score and Game Over.
        // Wait, we need to render the items.
        // Okay, we will set state.

        // Check game over condition (e.g. negative score?)
        if (gameState.current.score < 0) {
            setGameOver(true);
            setIsPlaying(false);
            cancelAnimationFrame(requestRef.current);
            return;
        }

        requestRef.current = requestAnimationFrame(gameLoop);
        // Force update to render items
        setTick(prev => prev + 1);
    };

    const [tick, setTick] = useState(0); // Used to trigger re-render

    const handleMouseMove = (e) => {
        if (!containerRef.current || !isPlaying) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        gameState.current.basketX = Math.max(0, Math.min(100, percentage));
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current || !isPlaying) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        gameState.current.basketX = Math.max(0, Math.min(100, percentage));
    };

    useEffect(() => {
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#3B82F6', marginBottom: 'var(--spacing-md)' }}>Attrape Cadeaux</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Score: {score}</span>
                <span>Évitez le charbon (⚫) !</span>
            </div>

            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    backgroundColor: '#E0F2FE',
                    border: '4px solid #3B82F6',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    cursor: 'none',
                    touchAction: 'none'
                }}
            >
                {!isPlaying && !gameOver && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10
                    }}>
                        <button onClick={startGame} style={{
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            backgroundColor: '#3B82F6',
                            color: '#FFF',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            Jouer
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        padding: 'var(--spacing-xl)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '2rem', color: 'var(--color-error)' }}>Perdu !</h3>
                        <p style={{ fontSize: '1.2rem', margin: 'var(--spacing-md) 0' }}>Score final : {score}</p>
                        <button onClick={startGame} style={{
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            backgroundColor: '#3B82F6',
                            color: '#FFF',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 'bold'
                        }}>
                            Rejouer
                        </button>
                    </div>
                )}

                {/* Basket */}
                <div
                    ref={basketRef}
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: `${gameState.current?.basketX || 50}%`,
                        transform: 'translateX(-50%)',
                        fontSize: '3rem',
                        pointerEvents: 'none'
                    }}
                >
                    🎅
                </div>

                {/* Items */}
                {gameState.current?.items.map(item => (
                    <div
                        key={item.id}
                        style={{
                            position: 'absolute',
                            top: `${item.y}%`,
                            left: `${item.x}%`,
                            transform: 'translateX(-50%)',
                            fontSize: '2rem',
                            pointerEvents: 'none'
                        }}
                    >
                        {item.type === 'gift' ? '🎁' : '⚫'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatchGame;
