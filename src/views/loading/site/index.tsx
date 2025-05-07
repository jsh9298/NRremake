// import {
//     box,
//     overlay,
//     layout,
//     topCogBox, topCog1, topCog2, topCog3, topCog4,
//     leftCogBox, leftCog1, leftCog2, leftCog3, leftCog4,
//     bottomCogBox, bottomCog1, bottomCog2, bottomCog3, bottomCog4
// } from "./styles";
import styles from './styles.module.css';
export function SiteLoader() {
    return (
        <div className={styles.box}>
            <div className={styles.overlay}></div>
            <div className={styles.layout}>
                <div className={styles.topCogBox}>
                    <div className={styles.topCog1}></div>
                    <div className={styles.topCog2}></div>
                    <div className={styles.topCog3}></div>
                    <div className={styles.topCog4}></div>
                </div>
                <div className={styles.leftCogBox}>
                    <div className={styles.leftCog1}></div>
                    <div className={styles.leftCog2}></div>
                    <div className={styles.leftCog3}></div>
                    <div className={styles.leftCog4}></div>
                </div>
                <div className={styles.bottomCogBox}>
                    <div className={styles.bottomCog1}></div>
                    <div className={styles.bottomCog2}></div>
                    <div className={styles.bottomCog3}></div>
                    <div className={styles.bottomCog4}></div>
                </div>
            </div>
        </div>
    );
}
