import { Disclosure } from '@headlessui/react'
import React from 'react'

const MobileNavigation = ({navigation,classNames}) => {
  return (
    <Disclosure.Panel className="sm:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
            <Disclosure.Button
                key={item.name}
                as="a"

                onClick={() => nav(item.href)}
                className={classNames(
                    item.current ? 'bg-gray-900 text-white cursor-pointer' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium cursor-pointer'
                )}
                aria-current={item.current ? 'page' : undefined}
            >
                {item.name}
            </Disclosure.Button>
        ))}
    </div>
</Disclosure.Panel>  )
}

export default MobileNavigation