
import styles from '@/views/loading/site/loading.module.css';
export function SiteLoader() {
    return (
        <div className={styles.box}>
            <div className={styles.overlay}></div>
            <div className={styles.layout}>
                <div className={styles.topCogBox}>
                    <div className={[styles.topCogs, styles.One].join(" ")}></div>
                    <div className={[styles.topCogs, styles.Two].join(" ")}></div>
                    <div className={[styles.topCogs, styles.Three].join(" ")}></div>
                    <div className={[styles.CogCenter, styles.topCenter].join(" ")}></div>
                </div>
                <div className={styles.leftCogBox}>
                    <div className={[styles.leftCogs, styles.One].join(" ")}></div>
                    <div className={[styles.leftCogs, styles.Two].join(" ")}></div>
                    <div className={[styles.leftCogs, styles.Three].join(" ")}></div>
                    <div className={[styles.CogCenter, styles.topCenter].join(" ")}></div>
                </div>
                <div className={styles.bottomCogBox}>
                    <div className={[styles.bottomCogs, styles.One].join(" ")}></div>
                    <div className={[styles.bottomCogs, styles.Two].join(" ")}></div>
                    <div className={[styles.bottomCogs, styles.Three].join(" ")}></div>
                    <div className={[styles.CogCenter, styles.topCenter].join(" ")}></div>
                </div>
            </div>
        </div>
    );
}
