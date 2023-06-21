import React, { Fragment } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Menu, Transition } from '@headlessui/react'

const AvatarNavigation = ({navigation,classNames,imageProfile}) => {
    const {modal:{signInModal,signUpModal},signOut} = useAuth()
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


    {/* Profile dropdown */}
    <Menu as="div" className="relative ml-3">
        <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full"
                    src={imageProfile}
                    alt=""
                />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            {/* Render Navigate Avatar */}

            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {navigation.map((item, i) => (
                    <Menu.Item key={i}>
                        {({ active }) => (
                            <button
                                onClick={() => {
                                    if (item.name != 'Login' && item.name != 'Register' && item.name != 'Sign Out') {
                                        nav(item.href)
                                    } else {
                                        switch (item.name) {
                                            case 'Login':
                                                signInModal()
                                                break;
                                            case 'Register':
                                                signUpModal()
                                                break;
                                            case 'Sign Out':
                                                signOut()
                                        }
                                    }

                                }}
                                className={classNames(active ? 'bg-gray-100' : '', 'w-full block px-4 py-2 text-sm text-gray-700')}
                            >
                                {item.name}
                            </button>
                        )}
                    </Menu.Item>

                ))}
            </Menu.Items>
        </Transition>
    </Menu>
</div>  )
}

export default AvatarNavigation