import { createContext, useContext, useState, type ReactNode } from 'react'

export type SideNames = "side1"|"side2"|"side3"

type ModalContextType = {
    modalIsOpen: boolean,
    openModal: ()=>void,
    closeModal: ()=>void,
    currentText: string | null,
    changeCurrentText: (newText:string|null)=>void
    currentData: SideNames | undefined,
    changeCurrentData: (newDataName: SideNames)=>void
}

const ModalContext = createContext<ModalContextType|undefined>(undefined)

const ModalContextProvider = ({children} :{children: ReactNode}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentText, setCurrentText] = useState<string|null>(null)
  const [currentData, setCurrentData] = useState<SideNames>()

  const openModal = () => {setModalIsOpen(true)}
  const closeModal = () => {setModalIsOpen(false)}
  const changeCurrentText = (newText:string|null) => {setCurrentText(newText)} 
  const changeCurrentData = (newDataName:SideNames) => {setCurrentData(newDataName)}

  return (
    <ModalContext.Provider value={
        {
        modalIsOpen, 
        openModal, 
        closeModal, 
        currentText, 
        changeCurrentText,
        changeCurrentData,
        currentData}}>
        {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
    const ctx = useContext(ModalContext)
    if(!ctx){
        throw new Error("No Modal Context!")
    }
    return ctx
}

export default ModalContextProvider