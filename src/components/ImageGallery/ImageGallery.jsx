import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

function ImageGallery({ images = [], onImageClick }) {
    if (!images || !Array.isArray(images) || !images.length) return null;

    return (
        <ul className={styles.imageGallery}>
            {images.map(img => (
                <li className={styles.imageItem} key={img.id}>
                    <ImageCard image={img} onClick={() => onImageClick(img)} />
                </li>
            ))}
        </ul>
    );
}

export default ImageGallery;