type Props = {
  title: string,
  headerType?: 'main-header' | 'sub-header'
}

const Header = ({ 
  title,
  headerType = 'main-header'
}: Props) => {
  return (
    <h3 className={headerType}>
      {title || '\u00A0'}
    </h3>
  )
}

export default Header;