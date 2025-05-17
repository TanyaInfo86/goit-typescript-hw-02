import './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
    return <button className="load-more" onClick={onClick}>Load more</button>;
}