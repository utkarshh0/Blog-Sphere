import img from '../assets/logo.png'

const Nav : React.FC = () => {

    return(
        <>
            <header className='bg-[#F3F4F6] fixed top-0 w-full'>
                <img src={img} className='p-4 h-16 md:h-20'  alt="" />
            </header>
        </>
    )
}

export default Nav