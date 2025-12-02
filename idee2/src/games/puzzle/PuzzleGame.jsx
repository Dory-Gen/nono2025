import React, { useState, useEffect } from 'react';

const PuzzleGame = () => {
    const [tiles, setTiles] = useState([]);
    const [isSolved, setIsSolved] = useState(false);
    const gridSize = 3; // 3x3
    const imageUrl = "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&q=80"; // Christmas Tree

    // Initialize and shuffle
    const initGame = () => {
        const newTiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
        // Last one is empty (represented by gridSize*gridSize - 1)

        // Shuffle (ensure solvable)
        // For simplicity, we'll just make random valid moves from solved state to shuffle
        let shuffled = [...newTiles];
        let emptyIdx = gridSize * gridSize - 1;
        let previousIdx = -1;

        for (let i = 0; i < 100; i++) {
            const neighbors = getNeighbors(emptyIdx);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            if (randomNeighbor !== previousIdx) {
                [shuffled[emptyIdx], shuffled[randomNeighbor]] = [shuffled[randomNeighbor], shuffled[emptyIdx]];
                previousIdx = emptyIdx;
                emptyIdx = randomNeighbor;
            }
        }

        setTiles(shuffled);
        setIsSolved(false);
    };

    const getNeighbors = (idx) => {
        const neighbors = [];
        const row = Math.floor(idx / gridSize);
        const col = idx % gridSize;

        if (row > 0) neighbors.push(idx - gridSize); // Up
        if (row < gridSize - 1) neighbors.push(idx + gridSize); // Down
        if (col > 0) neighbors.push(idx - 1); // Left
        if (col < gridSize - 1) neighbors.push(idx + 1); // Right

        return neighbors;
    };

    const moveTile = (idx) => {
        if (isSolved) return;

        const emptyIdx = tiles.indexOf(gridSize * gridSize - 1);
        const neighbors = getNeighbors(emptyIdx);

        if (neighbors.includes(idx)) {
            const newTiles = [...tiles];
            [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
            setTiles(newTiles);
            checkWin(newTiles);
        }
    };

    const checkWin = (currentTiles) => {
        const isWin = currentTiles.every((val, index) => val === index);
        if (isWin) setIsSolved(true);
    };

    useEffect(() => {
        initGame();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)', marginBottom: 'var(--spacing-md)' }}>Puzzle de Noël</h2>

            {isSolved && (
                <div className="animate-pop" style={{
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--color-success)',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                    Bravo ! Vous avez reconstitué l'image ! 🎄
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gap: '2px',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                border: '5px solid var(--color-accent)',
                backgroundColor: 'var(--color-accent)',
                aspectRatio: '1/1'
            }}>
                {tiles.map((tileVal, index) => {
                    const isEmpty = tileVal === gridSize * gridSize - 1;
                    const row = Math.floor(tileVal / gridSize);
                    const col = tileVal % gridSize;

                    return (
                        <div
                            key={index}
                            onClick={() => moveTile(index)}
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: isEmpty && !isSolved ? 'none' : `url(${imageUrl})`,
                                backgroundSize: `${gridSize * 100}%`,
                                backgroundPosition: `${col * (100 / (gridSize - 1))}% ${row * (100 / (gridSize - 1))}%`,
                                cursor: isEmpty ? 'default' : 'pointer',
                                opacity: isEmpty && !isSolved ? 0 : 1,
                                transition: 'transform 0.2s',
                            }}
                        />
                    );
                })}
            </div>

            <button onClick={initGame} style={{
                marginTop: 'var(--spacing-xl)',
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFF',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
            }}>
                Mélanger / Rejouer
            </button>
        </div>
    );
};

export default PuzzleGame;
