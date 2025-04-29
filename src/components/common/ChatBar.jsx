import propTypes from 'prop-types'
import { BsArrowUpCircle } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { useState, useRef, useEffect } from 'react';


function ChatBar({ onSend, placeholder, disabled, className, ...props }) {
  const textAreaRef = useRef(null);
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
      onSend(message);
    }
  };

  const handleLoadFile = (e) => {
    e.preventDefault();
    // TODO: Load file
  }
  
  const autoResize = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 10 * 24; // Giới hạn 10 dòng (mỗi dòng khoảng 24px)
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  }

  useEffect(() => {
    autoResize()
  }, [message])

  return (
    <form
      className={`py-4 px-5 min-w-[600px] flex-col justify-center items-center rounded-4xl bg-slate-100 dark:bg-black-600 shadow shadow-primary-200 ${className}`}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className='flex-col justify-start items-center mb-1.5'>
        <textarea
          ref={textAreaRef}
          rows={1}
          value={message}
          onInput={autoResize}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="custom-scrollbar outline-0 ml-1.5 mb-2 h-8 pr-1 w-full max-h-[240px] resize-none overflow-y-auto bg-transparent text-black-400 dark:text-black-50 text-[1.2rem]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <div className='flex items-center justify-between w-full'>
        
          <div className='flex items-center mr-1'>
            <button className='cursor-pointer' onClick={handleLoadFile}>
              <BsPlusCircle className='text-black-500 dark:text-black-100 h-[28px] w-[28px] mb-[-2px]  hover:text-black-400 dark:hover:text-white' />
            </button>
          </div>
        
          <button
            type='submit'
            className={`pr-3 transition-colors ${!message.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            disabled={!message.trim()}
          >
            <BsArrowUpCircle className='text-black-500 dark:text-black-100 h-[28px] w-[28px] hover:text-black-400 dark:hover:text-white' />
          </button>
        </div>

      </div>
    </form>
  )
}

ChatBar.propTypes = {
  onSend: propTypes.func,
  disabled: propTypes.bool,
  placeholder: propTypes.string,
  className: propTypes.string,
}

export default ChatBar
