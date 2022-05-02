import { useCallback, useState } from "react";

function useToggleOnce(init: boolean): [state: boolean, toggle: () => void] {
    const [state, setState] = useState(init);
    const toggle = useCallback(() => setState(!init), [init]);
    return [state, toggle];
}

export default useToggleOnce;