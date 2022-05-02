import { SpringRef, useTransition } from "react-spring";

function useFade(condition: boolean, ref?: SpringRef, duration?: number, easing?: (t: number) => number, delay?: number , onRest?: () => void) {
    const fade = useTransition(condition, {
        ref,
        config: { 
            duration,
            easing,
            delay
        },
        from: {
            opacity: 0
        },
        enter: {
            opacity: 1
        },
        leave: {
            opacity: 0
        },
        onRest
    })
    return fade;
}

export default useFade;