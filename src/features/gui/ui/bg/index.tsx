"use client";
import { useState } from "react";
import { Bar } from "./bar";
import { RndLayouts } from "./wd";
import { TerminalView } from "@/features/cli";

export function Background() {
    const [isOpen,SetIsOpen] = useState<boolean>(false);
    const open = () =>{
        SetIsOpen(prev=>!prev);
    }
    const icon =      ( 
        <div style={
            {
                width:'50px',
                height:'50px',
                backgroundColor : 'green',
                color : 'white',
                borderRadius : '10%',
                textAlign:'center',
                padding:'10px',
                fontSize:'10px'
            }
           
        } onClick={open}>
           Terminal
        </div>);
    return (
        <div style={{width:'100vw',height:'100vh',}}>
            <div style={{display:'grid',width:'80%',height:'80%',border : '2px solid green'}}>

            </div>
            <Bar icons={[icon]}></Bar>
            {isOpen && 
            <RndLayouts>
                <TerminalView/>
            </RndLayouts>}
        </div>
    );
}
