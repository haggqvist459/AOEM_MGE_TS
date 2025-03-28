type Props = {
    children: React.ReactNode;
}

const CalculatorContainer = ({ children }: Props) => {
    return (
        <section className="bg-neutral-300 flex flex-col w-11/12 lg:w-3/4 mx-auto mt-5 py-5 border shadow-md rounded-md">
            <div className="px-5">
                {children}
            </div>
        </section>
    )
}

export default CalculatorContainer;