import styles from './ImageCard.module.css';

function ImageCard({ image, onClick }) {
    return (
        <div onClick={onClick}>
            <img
                className={styles.imageCard}
                src={image?.urls?.small}
                alt={image?.alt_description || 'image'}
            />
        </div>
    );
}

export default ImageCard;