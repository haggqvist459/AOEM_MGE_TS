type Props = {
  isToggled: boolean
}

const CheckCross = ({
  isToggled
}: Props) => {
  return (
    <svg
      fill="none"
      viewBox="2 2 20 20"
      strokeWidth="2"
      stroke="currentColor"
      className={`size-5 translate-y-0 transition-colors duration-[400ms] ${isToggled ? 'text-primary' : 'text-secondary'}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

export default CheckCross;