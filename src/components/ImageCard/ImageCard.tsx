import styles from './ImageCard.module.css';
import { Image } from '../../types';

interface ImageCardProps {
    image: Image;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
    return (
        <div className={styles.cardWrapper} onClick={onClick}>
            <img
                className={styles.imageCard}
                src={image.urls.small}
                alt={image.alt_description || 'image'}
            />
        </div>
    );
};

export default ImageCard;
