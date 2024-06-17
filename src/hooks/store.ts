import {useDispatch, useSelector, useStore} from "react-redux";
import {AppDispatch, RootState} from "../store/index.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()