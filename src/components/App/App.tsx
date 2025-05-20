import style from "./App.module.css";
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import { Image } from '../../types';
import { fetchImagesWithTopic } from '../../images-api';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (query === '') return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (searchQuery: string, pageNum: number): Promise<void> => {
    setLoading(true);
    try {
      const { images: newImages, loadMore } = await fetchImagesWithTopic(searchQuery, pageNum);

      setImages(prev => pageNum === 1 ? newImages : [...prev, ...newImages]);
      setTotalPages(loadMore ? pageNum + 1 : pageNum);
      setError(null);
    } catch (err: any) {
      setError('Помилка завантаження зображень');
      toast.error('Помилка при завантаженні: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string): void => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => setPage(prev => prev + 1);

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = (): void => setShowModal(false);

  return (
    <div className={style.section}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
