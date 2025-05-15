import { JSX } from "react";

export function Bar(icons:{icons:JSX.Element[]}) {
    return(
        <div style={{
            width : '80vw',
            height : 'fit-content',
            border:'1px solid white',
            borderRadius : '3%',
            background : "#0000010"
        }}>
            {icons.icons.map((icon,index)=>(
                <div key={index} style={{marginLeft:'10px'}}> 
                    {icon}
                </div>)
               
            )}
        </div>
    );
}