import { PropTypes } from 'prop-types';
import { MdEdit, MdDelete } from "react-icons/md";

function DropdownMenu({ 
  position, 
  onClose, 
  onRename, 
  onDelete, 
  dropdownRef 
}) {
  return (
    <div
      ref={dropdownRef}
      style={{
        width: '12rem',
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      className="fixed z-[100] bg-black-700 rounded-md shadow-lg py-1 border border-primary-500/20"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRename();
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 text-left text-white hover:bg-black-600"
      >
        <MdEdit className="w-4 h-4 mr-2" />
        Rename
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
          onClose();
        }}
        className="flex items-center w-full px-4 py-2 text-left text-white hover:bg-black-600"
      >
        <MdDelete className="w-4 h-4 mr-2" />
        Delete
      </button>
    </div>
  );
}

DropdownMenu.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dropdownRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};

export default DropdownMenu;