import { useAuthContext } from '@/hooks/useAuthContext';
import { LogoutButton } from './logoutButton';
import { NavMobile } from './nav-mobile';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const { role, authReady } = useAuthContext();
    const navItems = authReady ? roleItems(role) : regularItems();

    return (
        <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
                <div className="flex items-center">
                    <Link href="/">
                        <p className="flex items-center space-x-2 text-black">
                            <Image src="/images/icon.ico" alt="Logo" width={80} height={80} className="rounded-md logo-image" />
                            <span className="font-semibold text-2xl lg:text-3xl">Vivid</span>
                        </p>
                    </Link>
                </div>

                <div className="hidden lg:flex lg:items-center lg:w-auto">
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        {navItems.map((navItem, index) => (
                            <Link key={index} href={navItem.link}>
                                <div className="text-black text-xl hover:text-green-500 transition-colors duration-200">{navItem.text}</div>
                            </Link>
                        ))}
                    </div>
                </div>

                <NavMobile links={navItems} />
            </div>
        </nav>
    );
}

const defaultItems = () => {
    return [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { text: 'Contact', link: '/contact' }
    ];
}

const roleItems = (role) => {
    return [
        ...defaultItems(),
        {
            text: 'Dashboard', link: `/dashboard/${role}`, options: [
                { text: 'Chat', link: `/dashboard/${role}/chat`}, // might need to change this later
                { text: 'Calendar', link: `/dashboard/${role}/calendar` }
            ]
        },
        {
            text: 'Profile', link: '/profile'
        },
        {
            text: <LogoutButton />, link: ''
        }
    ]; 
}

const regularItems = () => {
    return [
        ...defaultItems(),
        { text: 'Login', link: '/auth/login' },
        { text: 'Register', link: '/auth/register' }
    ];
}