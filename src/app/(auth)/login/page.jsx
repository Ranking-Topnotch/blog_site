import LoginForm from "@/component/loginForm/LoginForm";
import { handleGitHubLogin } from "@/lib/action";
import styles from "./login.module.css";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGitHubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;