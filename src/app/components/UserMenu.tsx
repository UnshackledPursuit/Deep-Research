'use client';

import { useAuth } from "@/lib/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

interface MenuItemProps {
  active: boolean;
}

export function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-200" />
          <User className="w-5 h-5" />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none divide-y divide-gray-100">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 font-medium">
              {user.displayName || 'User'}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {user.email}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }: MenuItemProps) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? "bg-gray-50" : ""
                  } group flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:text-gray-900`}
                >
                  <LogOut className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 