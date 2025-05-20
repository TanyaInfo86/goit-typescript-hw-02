import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { Image } from '../../types';

interface Props {
    images: Image[];
    onImageClick: (image: Image) => void;
}

function ImageGallery({ images, onImageClick }: Props) {
    if (!images.length) return null;

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
