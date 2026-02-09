import styles from "./CubeSide.module.css"
import { useModalContext, type SideNames } from "../context/ModalContextProvider"

type CubeSideProps = {
    cubeClassName: string,
    text: string | null,
    image: string | null,
    side: SideNames | "name"
}

const CubeSide = ({ cubeClassName, text, image, side }: CubeSideProps) => {
    const {openModal, changeCurrentText, changeCurrentData} = useModalContext()

    const changeText = () => {
        if(side == "name") return
        changeCurrentText(text)
        changeCurrentData(side)
        openModal()
    }

    return (
        <div className={cubeClassName}>
            <div className={styles.stripe} onClick={()=>side !== "name" && changeText()}>
                {text && <p>{text}</p>}
                {image && <img src={image} />}
            </div>
        </div>
    )
}

export default CubeSide