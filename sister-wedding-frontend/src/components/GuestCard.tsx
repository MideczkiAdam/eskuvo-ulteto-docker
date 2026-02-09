import { useState } from "react";
import type { GuestType } from "../types/weddingTypes"
import styles from "./GuestCard.module.css"
import { deleteGuestEndpoint, modifyGuestEndpoint } from "../services/authEndpoints";
import { useGuests } from "../hooks/useGuests";
const GuestCard = ({id,name}:GuestType) => {
  const [editMode, setEditMode] = useState(false);
  const [currentName, setCurrentName] = useState(name)
  const {refetch} = useGuests()
  const saveModifications = () => {
    modifyGuestEndpoint(currentName, id).then(res => {
      console.log(res);      
      setEditMode(false);
      refetch()
    })
  }

  const deleteGuest = () => {
    deleteGuestEndpoint(id).then(res => {
      setEditMode(false)
      console.log(res)
      refetch()
    })
  }

  return (
    <div>
        {editMode ? (
            <div className={styles.editMode}>
                <input type="text" defaultValue={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                <button onClick={saveModifications}><i className="fa-regular fa-floppy-disk"></i></button>
                <button onClick={deleteGuest}><i className="fa-regular fa-trash-can"></i></button>
                <button onClick={() => setEditMode(false)}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
        ) : (
            <div className={styles.guestCard}>
                <span>{name}</span>
                <button onClick={() => setEditMode(true)}><i className="fa-regular fa-pen-to-square"></i></button>
            </div>
        )}
    </div>
  )
}

export default GuestCard