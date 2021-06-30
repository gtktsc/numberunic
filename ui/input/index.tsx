import { ChangeEvent, useState } from "react";

import useValue from "controllers/current-value-controller";
import ErrorMessage from "ui/common/error";

import styles from "./input.module.css";
import messages from "./messages";
import { validate } from "./utils";

const Input = () => {
  const [{ value }, { setValue }] = useValue();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const maybeValue = Number(value);

    if (validate(maybeValue)) {
      setValue(maybeValue);
      setErrorMessage(null);
    } else {
      setErrorMessage(messages.error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.common} htmlFor="input">
        {messages.label}
      </label>
      <input
        id="input"
        className={styles.common}
        type="number"
        onChange={onChange}
        // in order to remove error message on focus out
        onBlur={onChange}
        value={value}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Input;
