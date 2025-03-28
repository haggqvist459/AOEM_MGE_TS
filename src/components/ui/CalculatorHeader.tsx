import { Trashcan } from "../icons";
type Props = {
    title: string,
    showTrash?: boolean,
    handleClick: () => void
}

const CalculatorHeader = ({ title, showTrash = true, handleClick }: Props) => {
    return (
        <div className="flex items-baseline justify-center w-full relative mb-5">
            <h1 className='calculatorHeader'>{title}</h1>

            {showTrash &&
                <button
                    onClick={handleClick}
                    className="absolute right-0 text-primary hover:text-blue-50">
                    <Trashcan />
                </button>
            }
        </div>
    )
}

export default CalculatorHeader;