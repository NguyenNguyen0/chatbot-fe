import '../assets/css/Footer.css';
import { FaGithub } from "react-icons/fa6";

function Footer() {
    return (
        <footer className='position-relative'>
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>

            <div className='bg-primary-800 pb-8 pt-8'>
                <div className="text-center">
                    <ul className="list-unstyled list-inline text-center text-xl py-2">
                        <li className="mx-4">
                            <a className="text-secondary-50" href="#">Home</a>
                        </li>
                        <li className="mx-4">
                            <a className="text-secondary-50" href="#">Login</a>
                        </li>
                        <li className="mx-4">
                            <a className="text-secondary-50" href="#">Chat</a>
                        </li>
                    </ul>

                    <p className="text-primary-200 flex items-center justify-center">
                        <span>Made by</span>
                        <a className='underline m-2' href="https://github.com/NguyenNguyen0" target='_blank' rel='noopener noreferrer'>NguyenNguyen0</a>
                        <FaGithub className='h-[24px] w-[24px]' />
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer
