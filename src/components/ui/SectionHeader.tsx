import { Trashcan } from "../icons";
type Props = {
    title: string,
    showTrash?: boolean,
    handleClick?: () => void
}

const SectionHeader = ({ title, showTrash = true, handleClick }: Props) => {
    return (
        <div className="flex items-center justify-center w-full relative mb-5">
            <h1 className='calculator-header'>{title}</h1>

            {showTrash &&
                <button
                    onClick={handleClick}
                    className="text-primary pb-0.5 absolute right-0 hover:text-blue-50">
                    <Trashcan />
                </button>
            }
        </div>
    )
}

export default SectionHeader;