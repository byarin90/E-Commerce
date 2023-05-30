import React from 'react'
import { useSelector } from 'react-redux'

const useAuth = () => {
    const { user, loading, error, status } = useSelector(state => state.authReducer)


    return {user, loading, error, status}
}

export default useAuth