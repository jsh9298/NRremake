'use client';

import { TerminalContextProvider, ReactTerminal, TerminalContext } from "react-terminal";
import { useContext, useState } from "react";
export default function Test() {
    const { setBufferedContent, setTemporaryContent } = useContext(TerminalContext);
    const [theme, setTheme] = useState<string>("light");
    const [prompt, setPrompt] = useState<string>(">>>");

    const commands = {
        help: (
            <span>
                <strong>clear</strong> - clears the console. <br />
                <strong>change_prompt &lt;PROMPT&gt;</strong> - Change the prompt of the
                terminal. <br />
                <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
                terminal. Allowed themes - light, dark, material-light, material-dark,
                material-ocean, matrix and dracula. <br />
                <strong>toggle_control_bar</strong> - Hides / Display the top control
                bar. <br />
                <strong>toggle_control_buttons</strong> - Hides / Display the top
                buttons on control bar. <br />
                <strong>evaluate_math_expression &lt;EXPR&gt;</strong> - Evaluates a
                mathematical expression (eg, <strong>4*4</strong>) by hitting a public
                API, api.mathjs.org. <br />
                <strong>wait &lt;TIME&gt;</strong> - Wait for TIME (seconds). <br />
                <strong>count_to &lt;NUM&gt;</strong> Count from 1 to NUM (integer).
            </span>
        ),

        change_prompt: (prompt: string) => {
            setPrompt(prompt);
        },

        change_theme: (theme: string) => {
            const validThemes = [
                "light",
                "dark",
                "material-light",
                "material-dark",
                "material-ocean",
                "matrix",
                "dracula",
            ];
            if (!validThemes.includes(theme)) {
                return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
            }
            setTheme(theme);
        },

        wait: async (timeout: string) => {
            setTemporaryContent("Waiting...");
            await new Promise(resolve => setTimeout(() => {
                resolve(void 0);
            }, parseInt(timeout) * 1000));
            return 'Over!';
        },

        count_to: async (nbs: string) => {
            setTemporaryContent("Counting...");
            const nb = parseInt(nbs);
            await Promise.all(
                new Array(nb).fill({}).map((value, index) => new Promise((resolve) => {
                    const timer = setTimeout(() => {
                        setBufferedContent((previous) => (<>
                            {previous}
                            <span>
                                {index + 1}
                            </span>
                            {index + 1 < nb ? <br /> : ''}
                        </>));
                        clearTimeout(timer);
                        resolve(void 0);
                    }, index * 1000);
                }))
            );
            return <><br />Finished</>;
        }
    };

    const welcomeMessage = (
        <span>
            Type &quot;help&quot; for all available commands. <br />
        </span>
    );
    return (
        <TerminalContextProvider>
            <ReactTerminal
                prompt={prompt}
                theme={theme}
                showControlBar={false}
                showControlButtons={false}
                welcomeMessage={welcomeMessage}
                commands={commands}
                defaultHandler={(command: string, commandArguments: string) => {
                    return `${command} passed on to default handler with arguments ${commandArguments}`;
                }}
            />
        </TerminalContextProvider>
    );
}