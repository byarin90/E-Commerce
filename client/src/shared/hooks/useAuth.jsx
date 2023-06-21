import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuthModal, showAuthModal, toSignIn, toSignUp, toggleIsSignIn } from '../redux/features/modalSlice'
import { getUserInfo, userLogout } from '../redux/features/authSlice'
import { fetchCheckAuth, fetchSignOut } from '../services/serviceAuth'
import { useNavigate } from 'react-router-dom'
import { ERROR_AUTH } from '../constant/constant'

const useAuth = () => {
    const { user, loading, error, status } = useSelector(state => state.authReducer)
    const { show, isSignIn } = useSelector(state => state.modalReducer.authModal)
    const dispatch = useDispatch()
    const nav = useNavigate()






    const showModal = () => {
        dispatch(showAuthModal())
    }

    const hideModal = () => {
        dispatch(closeAuthModal())
    }

    //to show sign in modal
    const signInModal = () => {
        dispatch(toSignIn())
        dispatch(showAuthModal())
    }
    //to show sign up modal
    const signUpModal = () => {
        dispatch(toSignUp())
        dispatch(showAuthModal())
    }
    //to toggle between sign in and sign up
    const changeModalToggle = () => {
        dispatch(toggleIsSignIn())
    }
    const signOut = async () => {
        await fetchSignOut()
        dispatch(userLogout())
        signInModal();
        nav('/')
    }
    const getUser = () => {
        if (user == null) {
            dispatch(getUserInfo())
        } else if (error.erorr_code == ERROR_AUTH) {
            //logout
            signOut()
        } else {
            //logout and show error
        }
    }

    const checkAuth = async () => {
            try{
                const {data} = await fetchCheckAuth()
                console.log(data)
            }catch(error){
                console.log(error.data.error_code)
                if(error.data.error_code == ERROR_AUTH){
                    signOut()
                }
                throw error
            }
          
       
    }

    const modal = {
        show,
        isSignIn,
        signInModal,
        signUpModal,
        changeModalToggle,
        hideModal,
        showModal
    }

    return { user, loading, error, status, getUser, signOut, modal,checkAuth }
}

export default useAuth