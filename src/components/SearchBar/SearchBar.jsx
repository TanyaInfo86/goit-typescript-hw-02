import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
            toast.error('Введи ключове слово для пошуку');
            return;
        }
        console.log('Пошуковий запит що я ввела:', input);
        onSubmit(input);
    };

    return (
        <header className={styles.block}>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
}