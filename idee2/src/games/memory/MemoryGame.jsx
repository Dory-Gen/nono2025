import React, { useState, useEffect } from 'react';
import Card from './Card';

const cardImages = [
    { "src": "🎅", matched: false },
    { "src": "🎁", matched: false },
    { "src": "⛄", matched: false },
    { "src": "🦌", matched: false },
    { "src": "❄️", matched: false },
    { "src": "🔔", matched: false },
    { "src": "🕯️", matched: false },
    { "src": "🍪", matched: false }
];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    // Shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
        setWon(false);
    };

    // Handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // Compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    // Check for win
    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setWon(true);
        }
    }, [cards]);

    // Reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    };

    // Start game automatically
    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>Memory de Noël</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>Trouvez toutes les paires ! Tours : {turns}</p>

            {won && (
                <div className="animate-pop" style={{
                    backgroundColor: 'var(--color-accent)',
                    padding: 'var(--spacing-lg)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--spacing-lg)',
                    color: '#FFF',
                    boxShadow: 'var(--shadow-glow)'
                }}>
                    <h3>Bravo ! Vous avez gagné en {turns} tours ! 🎉</h3>
                    <button onClick={shuffleCards} style={{
                        marginTop: 'var(--spacing-md)',
                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                        backgroundColor: '#FFF',
                        color: 'var(--color-accent)',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        Rejouer
                    </button>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>

            <button onClick={shuffleCards} style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'var(--color-secondary)',
                color: '#FFF',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
            }}>
                Nouvelle Partie
            </button>
        </div>
    );
};

export default MemoryGame;
