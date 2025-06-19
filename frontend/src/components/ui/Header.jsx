import './Header.css';

export default function AuthHeader({ title }) {
  return (
    <div className="auth-header">
      <h1>Welcome to <span>SwapMate</span></h1>
      <h2>{title}</h2>
    </div>
  );
}
