import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAuthModal } from '../redux/features/modalSlice'

const useAuth = () => {
    const { user, loading, error, status } = useSelector(state => state.authReducer)
    const {show,isSignIn} = useSelector(state => state.modalReducer.authModal)
    const dispatch = useDispatch()
    const showHideModal =()=>{
        dispatch(showAuthModal())
        return show
    }
    const modal ={
        show,
        isSignIn,
        showHideModal
    }

    return {user, loading, error, status,modal}
}

export default useAuth