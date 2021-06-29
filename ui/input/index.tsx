import { ChangeEvent, useState } from "react";
import useValue from "controller/value-context";

const validate = (number: number) => {
  if (number < 1 || number > 9999 || !Number.isInteger(number)) {
    throw new Error("Number must be an integer between 1 and 9999");
  }
};

export default function Input() {
  const [{ value }, { setValue }] = useValue();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => {
    try {
      validate(Number(value));
      setValue(Number(value));
      setErrorMessage(null);
    } catch ({ message }) {
      setErrorMessage(message);
    }
  };

  return (
    <>
      <label htmlFor="number-input">
        Select number (integer between 1 and 9999)
      </label>
      <input
        id="number-input"
        type="number"
        onChange={onChange}
        onBlur={onChange}
        value={value}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </>
  );
}
