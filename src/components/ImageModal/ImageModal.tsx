import Modal from 'react-modal';
import { useEffect } from 'react';
import styles from './ImageModal.module.css';
import { Image } from '../../types';

interface Props {
    image: Image;
    onClose: () => void;
}

// Встановлюємо кореневий елемент для доступності (додати id="root" у index.html)
Modal.setAppElement('#root');

export default function ImageModal({ image, onClose }: Props) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <Modal
            isOpen
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            className={styles.content}
            overlayClassName={styles.overlay}
        >
            <div className={styles.imgContainer}>
                <img
                    className={styles.img}
                    src={image.urls.regular}
                    alt={image.alt_description}
                />
                <div className={styles.info}>
                    <p>Автор: <span className={styles.details}>{image.user.name}</span></p>
                    <p>Лайки: <span className={styles.details}>{image.likes}</span></p>
                    {image.description && (
                        <p>Опис: <span className={styles.details}>{image.description}</span></p>
                    )}
                </div>
            </div>
        </Modal>
    );
}
