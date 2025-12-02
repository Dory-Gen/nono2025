import React, { useState } from 'react';
import questions from '../../data/quiz_questions.json';

const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswerOptionClick = (option) => {
        if (selectedOption) return; // Prevent multiple clicks

        setSelectedOption(option);
        const correct = option === questions[currentQuestion].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowScore(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-accent)', marginBottom: 'var(--spacing-lg)' }}>Quiz de Noël</h2>

            {showScore ? (
                <div className="animate-pop" style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>
                        Score Final : {score} / {questions.length}
                    </h3>
                    <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                        {score === questions.length ? "Incroyable ! Vous êtes un expert de Noël ! 🎅" :
                            score > questions.length / 2 ? "Bravo ! Bon travail ! 🎄" :
                                "Oups ! Réessayez pour devenir un lutin expert ! ❄️"}
                    </p>
                    <button onClick={resetQuiz} style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        backgroundColor: 'var(--color-primary)',
                        color: '#FFF',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        Rejouer
                    </button>
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <span style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>Question {currentQuestion + 1}/{questions.length}</span>
                        <h3 style={{ fontSize: '1.5rem', marginTop: 'var(--spacing-sm)' }}>{questions[currentQuestion].question}</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {questions[currentQuestion].options.map((option) => {
                            let bgColor = 'var(--color-background)';
                            let textColor = 'var(--color-text)';

                            if (selectedOption === option) {
                                bgColor = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
                                textColor = '#FFF';
                            } else if (selectedOption && option === questions[currentQuestion].answer) {
                                bgColor = 'var(--color-success)'; // Show correct answer if wrong one picked
                                textColor = '#FFF';
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleAnswerOptionClick(option)}
                                    disabled={selectedOption !== null}
                                    style={{
                                        padding: 'var(--spacing-md)',
                                        backgroundColor: bgColor,
                                        color: textColor,
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid #E2E8F0',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.2s',
                                        cursor: selectedOption ? 'default' : 'pointer'
                                    }}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizGame;
