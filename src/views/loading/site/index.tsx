import {
    box,
    overlay,
    layout,
    topCogBox, topCog1, topCog2, topCog3, topCog4,
    leftCogBox, leftCog1, leftCog2, leftCog3, leftCog4,
    bottomCogBox, bottomCog1, bottomCog2, bottomCog3, bottomCog4
} from "./styles";
export function SiteLoader() {
    return (
        <div className={box}>
            <div className={overlay}></div>
            <div className={layout}>
                <div className={topCogBox}>
                    <div className={topCog1}></div>
                    <div className={topCog2}></div>
                    <div className={topCog3}></div>
                    <div className={topCog4}></div>
                </div>
                <div className={leftCogBox}>
                    <div className={leftCog1}></div>
                    <div className={leftCog2}></div>
                    <div className={leftCog3}></div>
                    <div className={leftCog4}></div>
                </div>
                <div className={bottomCogBox}>
                    <div className={bottomCog1}></div>
                    <div className={bottomCog2}></div>
                    <div className={bottomCog3}></div>
                    <div className={bottomCog4}></div>
                </div>
            </div>
        </div>
    );
}