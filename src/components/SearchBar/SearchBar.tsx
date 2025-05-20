import style from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
import { FormEvent } from "react";

interface SearchBarProps {
    onSubmit: (topic: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const input = form.elements.namedItem("topic") as HTMLInputElement | null;
        const topic = input?.value.trim();

        if (!topic) {
            toast.error("Введіть пошуковий запит", {
                position: "top-right",
            });
            return;
        }

        onSubmit(topic);
        form.reset();
    };

    return (
        <header className={style.block}>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    type="text"
                    name="topic"
                    autoComplete="off"
                    autoFocus
                    placeholder="images and photos"
                    className={style.input}
                />
                <button type="submit" className={style.button}>Search</button>
            </form>
        </header>
    );
};

export default SearchBar;
