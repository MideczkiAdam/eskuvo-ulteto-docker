import { useState } from "react";
import { useModalContext } from "../context/ModalContextProvider";
import { changeSettingsEndpoint } from "../services/authEndpoints";
import styles from "./ModalHost.module.css";
import { useSettings } from "../hooks/useSettings";

const ModalHost = () => {
  const { modalIsOpen, closeModal, currentText, currentData} = useModalContext();
  const [newText, setNewText] = useState(currentText)
  if (!modalIsOpen) return null;
  const { refetch } = useSettings();

  const saveNewData = (e: React.FormEvent) => {
    e.preventDefault()
    if(!currentData) return
    changeSettingsEndpoint({[currentData]:newText}).then(res => {
      refetch()
      console.log(res)
      closeModal()
    })
  }

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form className={styles.editMode} onSubmit={saveNewData}>
            <input type="text" value={newText || ""} onChange={(e)=>{setNewText(e.target.value)}}/>
            <button type="submit">
              <i className="fa-regular fa-floppy-disk"></i>
            </button>
        </form>
      </div>
    </div>
  );
};

export default ModalHost;
