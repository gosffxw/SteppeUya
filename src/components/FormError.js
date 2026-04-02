function FormError({ text }) {
  if (!text) return null;

  return <p className="form-error">{text}</p>;
}

export default FormError;