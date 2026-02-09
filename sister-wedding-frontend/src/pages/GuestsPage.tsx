import { useGuests } from '../hooks/useGuests'
import GuestCard from '../components/GuestCard'
import { useState } from 'react'
import { addNewGuestEndpoint } from '../services/authEndpoints'
import styles from "./Guests.module.css"
const Guests = () => {
    const { data, isLoading } = useGuests()

    return (
        <main className='guestsPage'>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : <>
                <h1>Vendéglista</h1>
                <AddNewGuestComponent />
                {
                    data && data.length == 0 && <h2>Még nincsenek elmentett vendégek!</h2>
                }
                <div className='guestCardsWrapper'>
                    {
                        data && data.map(guest =>
                            <GuestCard key={guest.id} {...guest} />
                        )
                    }
                </div>
            </>
            }</main>
    )
}

const AddNewGuestComponent = () => {
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { refetch } = useGuests();

    const addNewGuest = (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault()
        addNewGuestEndpoint(name).then(res => {
            refetch();
            console.log(res)
            setName("")
            setIsLoading(false)
        })
    }
    return (
        <form onSubmit={addNewGuest} className={styles.addNewCardForm}>
            <input type="text" placeholder='Nicolas Cage' value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit" disabled={isLoading || name.length == 0} >
                {
                    isLoading ?
                        <i className="fa-solid fa-spinner animateSpinner"></i> :
                        <i className="fa-solid fa-plus"></i>
                }
            </button>
        </form>)
}
export default Guests