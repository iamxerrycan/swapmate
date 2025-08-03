// src/components/common/FormInput.jsx
export default function FormInput({ type, placeholder, value, onChange, className, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
}
