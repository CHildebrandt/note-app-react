import { useCallback, useState } from "react";

function useToggle(init: boolean): [state: boolean, toggle: () => void] {
    const [state, setState] = useState(init);
    const toggle = useCallback(() => setState(!state), [state]);
    return [state, toggle];
}

export default useToggle;