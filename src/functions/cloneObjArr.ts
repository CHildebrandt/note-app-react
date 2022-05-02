import { Data } from "../data/types"

function cloneObjArr(objArr: Data[]) {
    return objArr.map((a) => ({...a}));
}

export default cloneObjArr