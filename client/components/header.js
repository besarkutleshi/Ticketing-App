import Link from 'next/link'

export default ({ currentUser }) => {

    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className='nav-item'>
                    <Link href={href}>
                        <a className='nav-link'>{label}</a>
                    </Link>
                </li>
            )
        })

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brad">GitTix</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <i style={{ fontSize: "30px" }} className='bx bx-menu'></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className='d-flex justify-content-end'>
                    <ul className='nav d-flex align-items-center'>
                        {links}
                    </ul>
                </div>
            </div>
            
            <div className='d-flex justify-content-end'>
                <ul className='nav d-flex align-items-center'>
                    {links}
                </ul>
            </div>
        </nav>
    )
}

// require auth
// https://www.dmitry-ishkov.com/2021/05/restrict-nextjs-page-to-authenticated.html