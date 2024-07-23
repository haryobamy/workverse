export const onNumberValidator = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  onChange: (
    // eslint-disable-next-line no-unused-vars
    d: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
) => {
  const re = /^[.0-9\b]+$/;
  if (e.target.value === '' || re.test(e.target.value)) {
    onChange(e);
  }
};
