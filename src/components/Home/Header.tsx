import { Menu, RadioGroup } from '@headlessui/react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useProfile from 'src/data/useProfile';
import useRequests from 'src/data/useRequests';
import supabase from 'src/utils/supabase';
import classes from './index.module.css';

export default function Header(props: {
  toggleMenu(): void;
  isMenuVisible: boolean;
  selectedFilterOption: string;
  setSelectedFilterOption(value: string): void;
}) {
  const { selectedFilterOption, setSelectedFilterOption, toggleMenu, isMenuVisible } = props;
  const history = useHistory();

  const { data: profile } = useProfile();
  const { data: requests } = useRequests();

  const stats = requests?.reduce(
    (acc, curr) => ({
      planned: acc.planned + (curr.status === 'planned' ? 1 : 0),
      inProgress: acc.inProgress + (curr.status === 'in-progress' ? 1 : 0),
      live: acc.live + (curr.status === 'live' ? 1 : 0),
    }),
    { planned: 0, inProgress: 0, live: 0 }
  );

  const logout = () => {
    supabase.auth.signOut().then(() => history.push('/auth/login'));
  };

  return (
    <div className={classes.header}>
      <div className={`${classes.nav} bg-primary`}>
        <div className="text-white text-left flex flex-grow flex-row-reverse md:flex-col justify-between mr-4">
          <div className="flex items-center space-x-2">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="">
                <span className="sr-only"></span>
                <img
                  src={`https://avatars.dicebear.com/api/avataaars/${profile?.id}.svg`}
                  alt={profile?.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Menu.Button>
              <Menu.Items className="absolute z-10 top-12 mobile:right-0 md:left-0 overflow-auto bg-white rounded-md shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-40">
                <Menu.Item>
                  <button
                    className="w-full flex items-center space-x-2 px-3 py-3 text-danger hover:text-primary text-sm"
                    onClick={logout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      width="1em"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-xl"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <div className="hidden md:block">
              <p className="truncate leading-none">{profile?.name}</p>
              <p className="text-small leading-none font-semibold">@{profile?.username}</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-regular md:text-xl">Frontend Mentor</h1>
            <p className="opacity-75 text-small md:text-regular block font-medium">
              Feedback Board
            </p>
          </div>
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          <span className="sr-only">{isMenuVisible ? 'Close Menu' : 'Open Menu'}</span>
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="20" height="3" fill="white" />
            <rect y="7" width="20" height="3" fill="white" />
            <rect y="14" width="20" height="3" fill="white" />
          </svg>
        </button>
      </div>
      {/* Menu Dropshadow */}
      <div
        className={`${classes.menuBackdrop} ${isMenuVisible ? classes.visible : ''}`}
        role="button"
        onClick={toggleMenu}
        aria-hidden
      />
      <div className={`${classes.menu} ${isMenuVisible ? classes.visible : ''} bg-background`}>
        <div className="rounded p-6 bg-white">
          <RadioGroup value={selectedFilterOption} onChange={setSelectedFilterOption}>
            <RadioGroup.Label className="sr-only">Filter feedback</RadioGroup.Label>
            <div className="flex flex-wrap -ml-2 -mb-2">
              {['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'].map((option) => (
                <RadioGroup.Option
                  key={option}
                  value={option}
                  className={({ checked }) =>
                    `px-4 py-2 rounded font-semibold text-small ml-2 mb-2 cursor-pointer ${
                      checked ? 'bg-alternate' : 'bg-alternate-light'
                    }`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium  ${checked ? 'text-white' : 'text-alternate'}`}
                    >
                      {option}
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="rounded p-6 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Roadmap</p>
            <Link to="/roadmap" className="text-alternate font-semibold text-small">
              View <span className="sr-only">Roadmap</span>
            </Link>
          </div>
          <div className="mt-6">
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-status-planned" role="presentation" />
              <span className="ml-4">Planned</span>
              <span className="ml-auto font-bold">{stats?.planned}</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-status-in-progress" role="presentation" />
              <span className="ml-4">In Progress</span>
              <span className="ml-auto font-bold">{stats?.inProgress}</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-status-live" role="presentation" />
              <span className="ml-4">Live</span>
              <span className="ml-auto font-bold">{stats?.live}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
