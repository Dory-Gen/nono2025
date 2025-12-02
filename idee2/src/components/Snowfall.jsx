import React, { useEffect, useState } from 'react';

const Snowfall = () => {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
        const flakeCount = 50;
        const newFlakes = Array.from({ length: flakeCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + 'vw',
            animationDuration: Math.random() * 3 + 2 + 's',
            animationDelay: Math.random() * 5 + 's',
            fontSize: Math.random() * 10 + 10 + 'px',
        }));
        setFlakes(newFlakes);
    }, []);

    return (
        <div className="snow-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.animationDelay,
                        fontSize: flake.fontSize,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};

export default Snowfall;
