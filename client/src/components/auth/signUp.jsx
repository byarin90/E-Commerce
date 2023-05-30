import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { joiResolver } from '@hookform/resolvers/joi'
import { authValidation } from '../../shared/validation/authValidation'
import { fetchSignUp } from '../../shared/services/serviceAuth'
import Loading from '../../shared/components/loading'

export const SignUp = ({showHideModal}) => {
    // Reack hook form
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(authValidation.registerSchema) })
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
        //? Api no need confirmPassword
        delete _bodyData.confirmPassword
        console.log(_bodyData)
        signUp(_bodyData)
    }

    const signUp = async (_bodyData) => {
        setLoading(true)
        try {
            const { data } = await fetchSignUp(_bodyData)
            console.log(data)
            if(data._id){
                showHideModal()
            }
        } catch (error) {
            console.log(error.data.err_msg)
            setError(error.data.err_msg)
        }
        setLoading(false)
    }

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
                            Sign Up
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <Link href={"/"} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign Up as Seller
                            </Link>
                        </p>
                    </div>

                    {/* Form get Event onSubmit and onSubmit get handleSubmit from react-hook-form
                    the onSub() is called from handleSubmit() and return as a callback the object with all values of inputs if errors exist so the handleSubmit dosent working */}

                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" >
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>

                                <input
                                    {...register('name')}
                                    className={"mt-6 px-2 relative block w-full rounded-md  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                                    placeholder="Full name"
                                />
                                {errors.name && <p className='m-0 p-0 text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div>

                                <input
                                    {...register('imgProfile')}
                                    className="mt-6 px-2 relative block w-full rounded-md  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Image URL"
                                    type='text'
                                />
                                {errors.imgProfile && <p className='m-0 p-0 text-red-500'>{errors.imgProfile.message}</p>}

                            </div>
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
                                    className="mt-6 px-2 relative block w-full rounded-md  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Password"
                                />
                                {errors.password && <p className='m-0 p-0 text-red-500'>{errors.password.message}</p>}
                            </div>
                            <div>

                                <input
                                    {...register('confirmPassword')}
                                    type="password"
                                    className="mt-6 px-2 relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Confirm password"
                                />
                                {errors.confirmPassword && <p className='m-0 p-0 text-red-500'>{errors.confirmPassword.message}</p>}
                            </div>
                            {  error && <p className='m-0 p-0 text-red-500'>{error}</p>}
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

                        <div>
                            <button type='button' onClick={()=>showHideModal()}>Close</button>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
