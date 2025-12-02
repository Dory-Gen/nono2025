import React, { useState, useRef, useEffect } from 'react';

// Chansons de Noël - Fichiers locaux
// IMPORTANT: Téléchargez des MP3 de Noël et placez-les dans public/music/
// Voir le fichier MUSIQUE_NOEL.md pour les instructions
const tracks = [
    {
        title: "🎄 Jingle Bells",
        src: "/music/jingle-bells.mp3"
    },
    {
        title: "🎅 We Wish You a Merry Christmas",
        src: "/music/we-wish-you.mp3"
    },
    {
        title: "⛄ Deck the Halls",
        src: "/music/deck-the-halls.mp3"
    },
    {
        title: "🔔 Carol of the Bells",
        src: "/music/carol-of-bells.mp3"
    }
];

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.4);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.log("Lecture automatique bloquée. Cliquez sur Play.");
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (audioRef.current) {
            audioRef.current.muted = newMuted;
        }
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        setIsPlaying(true);
    };

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '16px 24px',
            borderRadius: '50px',
            boxShadow: '0 6px 25px rgba(212, 36, 38, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            backdropFilter: 'blur(10px)',
            border: '3px solid var(--color-primary)',
            maxWidth: '95%'
        }}>
            <audio
                ref={audioRef}
                src={tracks[currentTrackIndex].src}
                onEnded={nextTrack}
                loop={false}
                preload="metadata"
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                    onClick={prevTrack}
                    style={{
                        fontSize: '1.4rem',
                        color: 'var(--color-primary)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Chanson précédente"
                >
                    ⏮️
                </button>

                <button onClick={togglePlay} style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(212, 36, 38, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 36, 38, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 36, 38, 0.4)';
                    }}
                    title={isPlaying ? "Pause" : "Lecture"}
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>

                <button
                    onClick={nextTrack}
                    style={{
                        fontSize: '1.4rem',
                        color: 'var(--color-primary)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Chanson suivante"
                >
                    ⏭️
                </button>
            </div>

            <div style={{
                height: '40px',
                width: '2px',
                backgroundColor: 'var(--color-primary)',
                opacity: 0.3
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                    onClick={toggleMute}
                    style={{
                        fontSize: '1.4rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title={isMuted ? "Activer le son" : "Couper le son"}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{
                        width: '80px',
                        accentColor: 'var(--color-primary)',
                        cursor: 'pointer'
                    }}
                    title="Volume"
                />
            </div>

            <div style={{
                height: '40px',
                width: '2px',
                backgroundColor: 'var(--color-primary)',
                opacity: 0.3
            }} />

            <div style={{
                fontSize: '0.95rem',
                minWidth: '150px',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'var(--color-text)',
                fontWeight: '600',
                textAlign: 'center'
            }}>
                {tracks[currentTrackIndex].title}
            </div>
        </div>
    );
};

export default MusicPlayer;
