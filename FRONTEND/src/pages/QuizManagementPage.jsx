import React, { useEffect, useState } from 'react';

const QuizManagement = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({ title: '', description: '' });

    const fetchQuizzes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/quizzes', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQuizzes(data);
            } else {
                console.error('Failed to fetch quizzes');
            }
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const addQuiz = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify(newQuiz),
            });

            if (response.ok) {
                const addedQuiz = await response.json();
                setQuizzes([...quizzes, addedQuiz]);
                setNewQuiz({ title: '', description: '' });
            } else {
                console.error('Failed to add quiz');
            }
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    const deleteQuiz = async (quizId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
            } else {
                console.error('Failed to delete quiz');
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz Management</h1>
            <form onSubmit={addQuiz} className="mb-4">
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Quiz Description"
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Quiz</button>
            </form>

            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id} className="mb-2 border p-2 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold">{quiz.title}</h2>
                            <p>{quiz.description}</p>
                        </div>
                        <button
                            onClick={() => deleteQuiz(quiz._id)}
                            className="bg-red-500 text-white px-4 py-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizManagement;
