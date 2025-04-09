type Props = {
  title: string
}

const SubHeader = ({ title }: Props) => {
  return (
    <h3 className="sub-header">
      {title}
    </h3>
  )
}

export default SubHeader;