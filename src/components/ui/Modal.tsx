type Props = {
  title: string
  description: string
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
}

const Modal = ({
  title,
  description,
  isOpen,
  onCancel,
  onConfirm
}: Props) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } bg-black/20`}
      onClick={onCancel}
    >
      <div
        className="bg-mint-white p-6 rounded shadow-lg w-full max-w-md mx-2"
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div className="bg-blue-50 p-6 rounded shadow-lg w-full max-w-md mx-2">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="mb-4">{description}</div>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 bg-neutral-400 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-primary text-blue-50 rounded">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;