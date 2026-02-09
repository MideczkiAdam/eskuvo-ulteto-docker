import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import styles from "./LoginPage.module.css"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    
    const {mutate, isPending, isError} = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate(
        { username, password },
        {
            onSuccess: () => {
            navigate('/');
            },
        }
        );
    };

return (
    <main className={styles.loginContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2>Bejelentkezés</h2>

            <div className={styles.formGroup}>
                <label htmlFor="username">Felhasználónév</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Jelszó</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {isError && <p className={styles.error}>Hibás felhasználónév vagy jelszó!</p>}

            <button type="submit" disabled={!username || !password || isPending}>
                {isPending ? 'Bejelentkezés…' : 'Bejelentkezés'}
            </button>
        </form>
    </main>
)

}

export default Login