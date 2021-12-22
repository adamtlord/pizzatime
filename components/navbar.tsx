import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useUser } from '@auth0/nextjs-auth0';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const LoggedIn = ({ user }) => (
  <>
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-white rounded-full shadow-md p-2 flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={user.picture}
            alt={user.name}
            width={32}
            height={32}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile"
                passHref
              >
                <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                  Your Profile
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/auth/logout"
              className='block px-4 py-2 text-sm text-gray-700'
            >
              Sign out
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  </>
)
const LoggedOut = () => (
  <div>
    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
    <a href="/api/auth/login" className="inline-flex items-center leading-4 px-4 py-2 border border-transparent font-medium rounded-full shadow-sm text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Log In</a>
  </div>
)
export default function Example() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b">
            <div className="flex justify-between h-24">
              <div className="flex">
                <Link href="/" passHref>
                  <a className="flex-shrink-0 flex items-center">
                    <Image
                      className="block h-8"
                      src="/logo.png"
                      alt="Pizza Time"
                      height={32}
                      width={32}
                    />
                    <span className="hidden lg:block text-red-700 font-bold text-2xl ml-2">Pizza Time</span>
                  </a>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* <a
                    href="#"
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </a> */}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? <LoggedIn user={user} /> : <LoggedOut />}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="bg-red-50 border-red-500 text-red-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </Disclosure.Button>

            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src="/logo.png"
                    alt="Profile"
                    height={40}
                    width={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                </div>
                {/* <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
              <div className="mt-3 space-y-1">
                <Link href="/profile" passHref>
                  <Disclosure.Button
                    as="a"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Your Profile
                  </Disclosure.Button>
                </Link>
                <Disclosure.Button
                  as="a"
                  href="/api/auth/logout"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}