import { useState } from "react";

export const useBoolean = (initState: boolean) => {
    const [state, setState] = useState(initState);

    const setTrue = () => setState(true);
    const setFalse = () => setState(false);
    const toggle = () => setState((prev) => !prev);

    return [state, setTrue, setFalse, toggle] as const;
};
