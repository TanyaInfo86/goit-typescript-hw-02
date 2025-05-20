import { ClipLoader } from 'react-spinners';
import './Loader.module.css';

export default function Loader() {
    return (
        <div className="loader">
            <ClipLoader color="#36d7b7" size={155} />
        </div>
    );
}
