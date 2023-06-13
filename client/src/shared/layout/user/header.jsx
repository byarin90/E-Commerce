import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Modal from '../../components/modals/modal'
import { SignUp } from '../../../components/auth/signUp'
import { SignIn } from '../../../components/auth/login'
import DesktopNavigate from './components/desktopNavigate'
import AvatarNavigation from './components/avatarNavigation'
import MobileNavigation from './components/mobileNavigation'
// Main navigation navigation tabs
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'About', href: '#', current: false }
]

const userNavigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Products', href: '#', current: false },
    { name: 'My favorite', href: '#', current: false }
]

// Avatar navigation tabs
const avatarNavigate = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/signUp' }
]
const userAvatarNavigate = [
    { name: 'Sign Out', href: '/logout' },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Header = () => {
    const { user, checkAuth, modal: { isSignIn, show,hideModal } } = useAuth()

    const checkToken = async () => {
        await checkAuth()
    }
    useEffect(() => {
        checkToken()
    }, [])
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            {/* Desktop nav */}
                            <DesktopNavigate classNames={classNames} navgation={user ? userNavigation : navigation} />
                            <AvatarNavigation 
                             navigation={user ? userAvatarNavigate : avatarNavigate}
                              classNames={classNames}
                              imageProfile={user ? user.imgProfile : "https://www.vhv.rs/dpng/d/409-4090121_transparent-background-user-icon-hd-png-download.png"}
                              />
                        </div>
                    </div>
                    {/* Render Navigate for Mobile */}
                    <MobileNavigation navigation={user ? userNavigation : navigation} classNames={classNames}/>

                    <Modal open={show} setOpen={hideModal}>
                        {isSignIn ?
                            <SignIn />
                            :
                            <SignUp />
                        }
                    </Modal>
                </>
            )}
        </Disclosure>
    )
}
