function FormSuccess({ text }) {
  if (!text) return null;

  return <p className="form-success">{text}</p>;
}

export default FormSuccess;