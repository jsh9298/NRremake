// features/terminal/model/commands/index.ts
import { Dispatch, SetStateAction, ReactNode } from "react";

type SetBufferedContent = Dispatch<SetStateAction<ReactNode>>;
type SetTemporaryContent =  Dispatch<SetStateAction<ReactNode>>;
type SetPrompt =  Dispatch<SetStateAction<string>>;
type SetTheme = Dispatch<SetStateAction<string>>;
type setShowControlBar = Dispatch<SetStateAction<boolean>>;
export const helpCommand = (): React.ReactNode => {
    return (
        <span>
            <strong>clear</strong> - clears the console. <br />
            <strong>change_prompt &lt;PROMPT&gt;</strong> - Change the prompt of the
            terminal. <br />
            <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
            terminal. Allowed themes - light, dark, material-light, material-dark,
            material-ocean, matrix and dracula. <br />
            <strong>toggle_control_bar</strong> - Hides / Display the top control
            bar. <br />
            <strong>wait &lt;TIME&gt;</strong> - Wait for TIME (seconds). <br />
            <strong>count_to &lt;NUM&gt;</strong> Count from 1 to NUM (integer).
        </span>
    );
};

export const changePromptCommand = (prompt: string): string => {
    return prompt;
};

export const changeThemeCommand = (theme: string): string | React.ReactNode => {
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
    return theme;
};

export const waitCommand = async (timeout: string, setTemporaryContent: SetTemporaryContent): Promise<string> => {
    setTemporaryContent("Waiting...");
    await new Promise(resolve => setTimeout(() => {
        resolve(void 0);
    }, parseInt(timeout) * 1000));
    return 'Over!';
};
export const countToCommand = async (nbs: string, setBufferedContent: SetBufferedContent, setTemporaryContent: SetTemporaryContent): Promise<React.ReactNode> => {
    setTemporaryContent("Counting...");
    const nb = parseInt(nbs);

    if (isNaN(nb) || nb <= 0) {
        setTemporaryContent(null); // 에러 시 temporary content 제거
        return "Error: Please provide a valid positive integer.";
    }

    const promises = new Array(nb).fill({}).map((value, index) => new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
            setBufferedContent((previous) => (<>
                {previous}
                <span>
                    {index + 1}
                </span>
                {index + 1 < nb ? <br /> : ''}
            </>));
            resolve(void 0); // Promise<void> 명시
        }, (index + 1) * 10); // 각 숫자가 10ms 간격으로 출력되도록 수정 (1초 간격은 너무 김)
    }));

    await Promise.all(promises);
    setTemporaryContent(null); // 완료 후 temporary content 제거
    return <><br />Finished</>;
};

export function createTerminalCommands(setBufferedContent: SetBufferedContent, setTemporaryContent: SetTemporaryContent, setPrompt: SetPrompt, setTheme: SetTheme, setShowControlBar:setShowControlBar ) {
    return {
        help: helpCommand, // Model에서 정의된 순수 로직 함수 사용

        change_prompt: (prompt: string) => {
            const newPrompt = changePromptCommand(prompt);
            setPrompt(newPrompt);
        },

        change_theme: (theme: string) => {
            const result = changeThemeCommand(theme);
            if (typeof result === 'string' && result.startsWith('Theme')) {
                return result; 
            }
            setTheme(result as string)
        },

       
        wait: (timeout: string) => waitCommand(timeout, setTemporaryContent),
        count_to: (nbs: string) => countToCommand(nbs, setBufferedContent, setTemporaryContent),
        toggle_control_bar: () => setShowControlBar(prev=>!prev)
        
    };
}