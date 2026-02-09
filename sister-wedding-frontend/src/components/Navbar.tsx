import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"
import { downloadPdfEndpoint } from "../services/authEndpoints"
import { useState } from "react"

const Navbar = () => {
    const location = useLocation()
    const logMeOut = () => {
        localStorage.clear()
        window.location.reload()
    }

    if (location.pathname === "/login") return undefined

    return (
        <nav className={styles.navbar}>
            {location.pathname !== "/" && (
                <Link to="/">
                    <i className="fa-solid fa-cube"></i>
                </Link>
            )}

            {location.pathname !== "/guests" && (
                <Link to="/guests">
                    <i className="fa-solid fa-people-group"></i>
                </Link>
            )}

            <DownloadPdfButton />

            <button onClick={logMeOut}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </nav>
    )
}

const DownloadPdfButton = () => {
    const [isLoading, setIsLoading] = useState(false)

    const startLoading = () => setIsLoading(true)
    const stopLoading = () => setIsLoading(false)

    const downloadButtonPressed = () => {
        downloadPdfEndpoint({startLoading, stopLoading})
    }

    return (
        <button onClick={downloadButtonPressed} disabled={isLoading}>
            {
                isLoading ?
                    <i className="fa-solid fa-spinner animateSpinner"></i> :
                    <i className="fa-solid fa-file-arrow-down"></i>
            }
        </button>
    )
}

export default Navbar