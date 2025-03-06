import propTypes from 'prop-types'
import { BsArrowUpCircle } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { useRef, useEffect } from 'react';


function ChatBar({ placeholder, text, ...props }) {
    const textAreaRef = useRef(null);
    
    const autoResize = () => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset chiều cao để lấy scrollHeight chính xác
            const maxHeight = 10 * 24; // Giới hạn 10 dòng (mỗi dòng khoảng 24px)
            textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
        }
    }

    useEffect(() => {
        autoResize()
    }, [text])

    return (
        <div className='py-4 px-5 min-w-[500px] flex-col justify-center items-center border-secondary-300 border-2 rounded-4xl bg-primary-600' {...props}>
            <div className='flex-col justify-start w-[90%] items-center mb-1.5'>
                <textarea
                    ref={textAreaRef}
                    rows={1}
                    onInput={autoResize}
                    placeholder={placeholder}
                    className="custom-scrollbar outline-0 ml-1.5 h-8 pr-1 w-full max-h-[240px] resize-none overflow-y-auto bg-transparent text-primary-50 text-[1.2rem]"
                >
                    {text}
                </textarea>
            </div>

            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center mr-1'>
                    <button className='cursor-pointer'>
                        <BsPlusCircle className='text-primary-50 h-[28px] w-[28px] mb-[-2px] hover:text-secondary-300' />
                    </button>
                </div>
                <button className='ml-3 mr-1 cursor-pointer self-end'>
                    <BsArrowUpCircle className='text-primary-50 h-[30px] w-[30px] hover:text-secondary-300' />
                </button>
            </div>
        </div>
    )
}

ChatBar.propTypes = {
    placeholder: propTypes.string,
    text: propTypes.string,
}

export default ChatBar
