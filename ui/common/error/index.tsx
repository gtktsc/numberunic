import styles from "./error.module.css";

const ErrorMessage = ({ message }: { message: string | null }) => (
  <span className={styles.warning}>{message}</span>
);

export default ErrorMessage;
