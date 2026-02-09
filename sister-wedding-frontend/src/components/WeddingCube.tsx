import { useState } from "react";
import styles from "./WeddingCube.module.css"
import { useSettings } from "../hooks/useSettings";
import CubeSide from "./CubeSide";

const WeddingCube = () => {
    const [rotateY, setRotateY] = useState(0);
    const { data, isPending } = useSettings();

    return (
        <>
            {isPending && <div>Loading...</div>}
            {!isPending && !data && <div>Error loading settings.</div>}
            {!isPending && data &&
                <div className={styles.cubeContainer}>
                    <div
                        className={styles.cube}
                        style={{ transform: `rotateY(${rotateY}deg)` }}
                    >
                        <CubeSide side="side1" cubeClassName={styles.face + " " + styles.front} text={data.side1} image={null} />
                        <CubeSide side="side2" cubeClassName={styles.face + " " + styles.right} text={data.side2} image={data.side2_image} />
                        <CubeSide side="side3" cubeClassName={styles.face + " " + styles.back} text={data.side3} image={data.side3_image} />
                        <CubeSide side="name" cubeClassName={styles.face + " " + styles.left} text={"Teszt Elek Géza Kálmán" } image={null} />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button onClick={() => setRotateY(rotateY - 90)}>
                            <i className="fa-solid fa-rotate-left"></i>
                        </button>
                        <button onClick={() => setRotateY(rotateY + 90)}>
                            <i className="fa-solid fa-rotate-right"></i>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default WeddingCube