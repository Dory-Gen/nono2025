import React from 'react';

const Card = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="card" style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
            <div
                className={flipped ? "flipped" : ""}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.5s',
                    transform: flipped ? 'rotateY(180deg)' : 'none',
                    cursor: 'pointer'
                }}
                onClick={handleClick}
            >
                {/* Front (Hidden) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        border: '2px solid #FFF',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                >
                    🎄
                </div>

                {/* Back (Revealed) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#FFF',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        transform: 'rotateY(180deg)',
                        border: '2px solid var(--color-primary)',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                >
                    {card.src}
                </div>
            </div>
        </div>
    );
};

export default Card;
