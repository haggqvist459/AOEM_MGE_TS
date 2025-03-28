type Props = {
  title: string
}

const SubHeader = ({ title }: Props) => {
  return (
    <div className="sub-header">
      {title}
    </div>
  )
}

export default SubHeader;