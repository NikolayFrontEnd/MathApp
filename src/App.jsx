
import './App.css'

import React, { useState } from 'react';

function App() {
    // Состояния для хранения параметров и результатов
    const [a, setA] = useState(-1);
    const [b, setB] = useState(1);
    const [n, setN] = useState(5);
    const [epsilon, setEpsilon] = useState(0.1);
    const [result, setResult] = useState({ min: null, max: null });

    // Функция для вычисления значений функции f(x)
    const f = (x) => {
        return 2 * Math.pow(x, 3) - 3 * Math.pow(x, 2) - 1;
    };

    // Функция для расчета минимального и максимального значения
    const calculateExtremum = () => {
        const values = [];
        if (n % 2 === 0) { // Четное количество итераций
            const step = (b - a) / (n / 2 + 1);
            for (let j = 1; j <= n / 2; j++) {
                const x_odd = a + step * j - epsilon / 2;
                const x_even = a + step * j + epsilon / 2;
                values.push(f(x_odd), f(x_even));
            }
        } else { // Нечетное количество итераций
            const step = (b - a) / (n + 1);
            for (let i = 1; i <= n; i++) {
                const x = a + step * i;
                values.push(f(x));
            }
        }

        // Находим минимальное и максимальное значения
        const min = Math.min(...values);
        const max = Math.max(...values);

        // Обновляем результат
        setResult({ min, max });
    };

    return (
<div className="container">
            <h1 className="title">Поиск экстремума функции</h1>
            
            <div className="form-group">
                <label className="label">
                    Левая граница (a):
                    <input
                        type="number"
                        value={a}
                        onChange={(e) => setA(parseFloat(e.target.value))}
                        className="input"
                    />
                </label>
            </div>

            <div className="form-group">
                <label className="label">
                    Правая граница (b):
                    <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                        className="input"
                    />
                </label>
            </div>

            <div className="form-group">
                <label className="label">
                    Количество итераций (n):
                    <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(parseInt(e.target.value))}
                        className="input"
                    />
                </label>
            </div>

            <div className="form-group">
                <label className="label">
                    Смещение (ε):
                    <input
                        type="number"
                        value={epsilon}
                        onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                        className="input"
                    />
                </label>
            </div>

            <button onClick={calculateExtremum} className="button">Рассчитать</button>

            <div className="results">
                <h3>Результаты:</h3>
                <p>Минимум: <span>{result.min !== null ? result.min : 'N/A'}</span></p>
                <p>Максимум: <span>{result.max !== null ? result.max : 'N/A'}</span></p>
            </div>
        </div>
    );
}

export default App;