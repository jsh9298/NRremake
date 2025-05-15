'use client';

import { ReactTerminal, TerminalContext } from "react-terminal";
import { useContext, useState, useMemo } from "react";
import { createTerminalCommands } from "../model/commends";

export function TerminalView() {
    const { setBufferedContent, setTemporaryContent } = useContext(TerminalContext);

    const [theme, setTheme] = useState<string>("light");
    const [prompt, setPrompt] = useState<string>(">>>");
    const [showControlBar,setShowControlBar] = useState<boolean>(true);


    const commands = useMemo(() => {
        return createTerminalCommands(setBufferedContent, setTemporaryContent, setPrompt, setTheme,setShowControlBar);
    }, [setBufferedContent, setTemporaryContent, setPrompt, setTheme,setShowControlBar]);

    const welcomeMessage = 
        ( <span>
            Type &quot;help&quot; for all available commands. <br />
        </span>);
    
    return (
            <ReactTerminal
                prompt={prompt} 
                theme={theme}  
                showControlBar={showControlBar}
                showControlButtons={true}
                welcomeMessage={welcomeMessage}
                commands={commands} 
                defaultHandler={(command: string, commandArguments: string) => {
                    return `${command} passed on to default handler with arguments ${commandArguments}`;
                }}
            />
    );
};
