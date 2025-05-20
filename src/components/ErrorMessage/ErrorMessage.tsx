import './ErrorMessage.module.css';

interface Props {
  message: string;
}

function ErrorMessage({ message }: Props) {
  return <p className="error">{message}</p>;
}

export default ErrorMessage;
