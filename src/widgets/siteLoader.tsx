export default function Loader() {
    return ( //center absolute left-0 right-0 top-0 bottom-0 m-auto
        // hole  rounded-full bg-white absolute
        <div className="relative m-auto w-[400px]">
            <div className="w-[150px] h-[150px] bg-transparent inset-shadow-[0px_0px_19px_0px_rgba(0,0,0,0.16)] shadow-[0px_0px_0px_1000px_rgba(255, 255, 255, 0.67)] rounded-full -z-1 absolute left-0 right-0 top-0 bottom-0 m-auto"></div>
            <div className="w-[100px] h-[100px] -z-2 -top-[120px] !important absolute left-0 right-0 bottom-0 m-auto">
                <div className="relative w-[100px] h-[100px] origin-[50px,50px] animate-[rotate_10s_infinite_linear]">{/* top  cogs*/}
                    <div className="w-[100px] h-[100px] absolute rounded-[10px] transform-[rotate(30deg)] bg-amber-400"></div>
                    <div className="w-[100px] h-[100px] absolute rounded-[10px] transform-[rotate(60deg)] bg-amber-400"></div>
                    <div className="w-[100px] h-[100px] absolute rounded-[10px] transform-[rotate(90deg)] bg-amber-400"></div>
                    <div className="w-[50px] h-[50px] rounded-full bg-background absolute left-0 right-0 top-0 bottom-0 m-auto"></div>
                </div>
                <div className="relative w-[80px] h-[80px] origin-[40px,40px] animate-[rotateLeft_10s_.1s_infinite_reverse_linear] top-[28px] left-[-24px] transform-[rotate(16deg)]">{/* left  cogs*/}
                    <div className="w-[80px] h-[80px] absolute rounded-[6px] transform-[rotate(30deg)] bg-blue-400"></div>
                    <div className="w-[80px] h-[80px] absolute rounded-[6px] transform-[rotate(60deg)] bg-blue-400"></div>
                    <div className="w-[80px] h-[80px] absolute rounded-[6px] transform-[rotate(90deg)] bg-blue-400"></div>
                    <div className="w-[40px] h-[40px] rounded-full bg-background absolute left-0 right-0 top-0 bottom-0 m-auto"></div>
                </div>
                <div className="relative w-[60px] h-[60px] origin-[30px,30px] animate-[rotateLeft_10.2s_.4s_infinite_linear] top-[-65px] left-[79px] transform-[rotate(4deg)]">{/* bottom  cogs*/}
                    <div className="w-[60px] h-[60px] absolute rounded-[5px] transform-[rotate(30deg)] bg-emerald-400"></div>
                    <div className="w-[60px] h-[60px] absolute rounded-[5px] transform-[rotate(60deg)] bg-emerald-400"></div>
                    <div className="w-[60px] h-[60px] absolute rounded-[5px] transform-[rotate(90deg)] bg-emerald-400"></div>
                    <div className="w-[30px] h-[30px] rounded-full bg-background absolute left-0 right-0 top-0 bottom-0 m-auto"></div>
                </div>
            </div>
        </div>
    );
}