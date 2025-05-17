import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import './App.module.css';

const ACCESS_KEY = 'RM0s4GBS6UGTPN7jBLCiK6xk39We0MPQMSsnywK9wZg';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query === '') return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (searchQuery, pageNum) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        query: searchQuery,
        page: pageNum,
        per_page: 12,
        client_id: ACCESS_KEY,
      });

      const res = await fetch(`https://api.unsplash.com/search/photos?${params.toString()}`);
      console.log(res);

      const data = await res.json();
      console.log(data);


      if (res.status !== 200) throw new Error(data.errors?.[0] || 'Unknown error');

      if (pageNum === 1) setImages(data.results);
      else setImages(prev => [...prev, ...data.results]);

      setTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      setError('Помилка завантаження зображень');
      toast.error('Помилка при завантаженні: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {showModal && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default App;

