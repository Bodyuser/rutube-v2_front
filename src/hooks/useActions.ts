import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { RootActions } from '@/redux/actions'
import { AppDispatch } from '@/redux/store/store'

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>()

	return useMemo(() => bindActionCreators(RootActions, dispatch), [dispatch])
}
