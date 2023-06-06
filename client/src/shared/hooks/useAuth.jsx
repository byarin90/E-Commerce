import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthModal, showAuthModal, toSignIn, toSignUp, toggleIsSignIn } from '../redux/features/modalSlice'

const useAuth = () => {
    const { user, loading, error, status } = useSelector(state => state.authReducer)
    const {show,isSignIn} = useSelector(state => state.modalReducer.authModal)
    const dispatch = useDispatch()
    const showModal =()=>{
        dispatch(showAuthModal())
    }

    const hideModal =()=>{
        dispatch(closeAuthModal())
    }

    //to show sign in modal
    const signInModal =()=>{
        dispatch(toSignIn())
        dispatch(showAuthModal())
    }
    //to show sign up modal
    const signUpModal =()=>{
        dispatch(toSignUp())
        dispatch(showAuthModal())
    }
    //to toggle between sign in and sign up
    const changeModalToggle =()=>{
        dispatch(toggleIsSignIn())
    }

    
    const modal ={
        show,
        isSignIn,
        signInModal,
        signUpModal,
        changeModalToggle,
        hideModal,
        showModal
    }

    return {user, loading, error, status,modal}
}

export default useAuth