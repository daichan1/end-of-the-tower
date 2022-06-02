import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import type { RootStore, AppDispatch } from './store'

// 型付きのuseSelectorを事前に定義
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector
// 型付きのuseDispatchを事前に定義
export const useAppDispatch = () => useDispatch<AppDispatch>()
