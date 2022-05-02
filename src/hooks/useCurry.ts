import { useState, useCallback } from "react";

/**Hook intended for avoiding multiple setter functions, in cases such as where the event object isn't needed on a button. */
function useCurry<T>(init: T): [state: T, setter: (newState: T) => () => void] {
    const [state, setState] = useState(init);
    const setter = useCallback((newState: T) => () => setState(newState), []);
    return [state, setter];
}

export default useCurry;