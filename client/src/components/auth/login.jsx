import { LockClosedIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { joiResolver } from '@hookform/resolvers/joi'
import { authValidation } from '../../shared/validation/authValidation'
import { fetchSignIn, fetchSignUp } from '../../shared/services/serviceAuth'
import Loading from '../../shared/components/loading'
import useAuth from '../../shared/hooks/useAuth'

export const SignIn = ({ }) => {
    const { modal: { hideModal, changeModalToggle }, getUser, user } = useAuth()

    // Reack hook form
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(authValidation.loginSchema) })
    //? getValues() : get the values of the input form by register name
    //? register() : register the input form by register name
    //? handleSubmit() : submit the input form by register name and send object with values
    //? formState: { errors } : get the errors of the input form by register name

    //? regular expression to validate email
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    // calling from handleSubmit(onSub) and return as callback the object with values
    const onSub = (_bodyData) => {
        setError(null)
        signIn(_bodyData)
    }
    const signIn = async (_bodyData) => {
        setLoading(true)
        try {
            const { data } = await fetchSignIn(_bodyData)
            if (data.login) {
                 getUser()
            }
        } catch (error) {
            setError(error.data.err_msg)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (user && user.name) {
            hideModal()
        }
    }, [user])

    return (
        <>
            <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign In
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <button onClick={() => changeModalToggle()} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign Up Now
                            </button>
                        </p>
                    </div>

                    {/* Form get Event onSubmit and onSubmit get handleSubmit from react-hook-form
                    the onSub() is called from handleSubmit() and return as a callback the object with all values of inputs if errors exist so the handleSubmit dosent working */}

                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" >
                        <div className="-space-y-px rounded-md shadow-sm">


                            <div>

                                <input
                                    {...register('email')}
                                    type="email"
                                    className="mt-6 px-2 relative block w-full rounded-md  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Email address"
                                />
                                {errors.email && <p className='m-0 p-0 text-red-500'>{errors.email.message}</p>}

                            </div>
                            <div>

                                <input
                                    {...register('password')}
                                    type="password"
                                    className="mt-2 px-2 relative block w-full rounded-md  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                                {errors.password && <p className='m-0 p-0 text-red-500'>{errors.password.message}</p>}
                            </div>

                            {error && <p className='m-0 p-0 text-red-500'>{error}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {loading && <Loading />}
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div className='flex justify-evenly flex-row-reverse'>

                            <button
                                type="submit"
                                className="group relative flex w-2/5 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign In
                            </button>
                            <button
                                onClick={() => hideModal()}
                                type="button"
                                className=" group relative flex w-2/5 justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <XMarkIcon className="h-5 w-5 text-red-400 group-hover:text-red-400" aria-hidden="true" />
                                </span>
                                Close
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
