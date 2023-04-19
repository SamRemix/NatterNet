import {
  HomeIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

export const topLinks = [
  {
    path: '/',
    icon: HomeIcon,
    label: 'Home'
  }
]

export const bottomLinks = [
  {
    path: '/sign-up',
    icon: UserPlusIcon,
    label: 'Sign up'
  },
  {
    path: '/log-in',
    icon: ArrowLeftOnRectangleIcon,
    label: 'Log in'
  }
]