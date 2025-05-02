import { Header } from "@/components"

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
        className="bg-white p-5 rounded shadow-lg w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Header title={title} />
        <p className="my-2">{description}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 bg-secondary rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-primary text-blue-50 rounded">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;