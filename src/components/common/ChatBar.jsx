import propTypes from 'prop-types'
import { BsArrowUpCircle } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { useState, useRef, useEffect } from 'react';


function ChatBar({ onSend, placeholder, text, className, ...props }) {
  const textAreaRef = useRef(null);
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleLoadFile = (e) => {
    e.preventDefault();
  }
  
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
    <form
      className={`py-4 px-5 min-w-[600px] flex-col justify-center items-center rounded-4xl bg-primary-600 ${className}`}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className='flex-col justify-start items-center mb-1.5'>
        <textarea
          ref={textAreaRef}
          rows={1}
          onInput={autoResize}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="custom-scrollbar outline-0 ml-1.5 h-8 pr-1 w-full max-h-[240px] resize-none overflow-y-auto bg-transparent text-primary-50 text-[1.2rem]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        >
          {message}
        </textarea>

        <div className='flex items-center justify-between w-full'>
        
          <div className='flex items-center mr-1'>
            <button className='cursor-pointer' onClick={handleLoadFile}>
              <BsPlusCircle className='text-primary-50 h-[28px] w-[28px] mb-[-2px] hover:text-secondary-300' />
            </button>
          </div>
        
          <button
            type='submit'
            className={`p-3 text-secondary-400 hover:text-secondary-300 transition-colors ${!message.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            disabled={!message.trim()}
          >
            <BsArrowUpCircle className='text-primary-50 h-[30px] w-[30px] hover:text-secondary-300' />
          </button>
        </div>

      </div>
    </form>
  )
}

ChatBar.propTypes = {
  placeholder: propTypes.string,
  className: propTypes.string,
  text: propTypes.string,
}

export default ChatBar
