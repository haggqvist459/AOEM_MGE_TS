
const Footer = () => {

  const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  (typeof window.navigator !== 'undefined' &&
    (window.navigator as any).standalone === true);

  return (
    <footer className={`bg-primary flex justify-center items-center my-auto ${isStandalone ? 'h-15 pb-2 ' : 'h-10'}`}>
      <a href="https://github.com/haggqvist459/AOEM_MGE_TS" target='_blank' className='underline text-sm text-blue-50'>Code on GitHub</a>
    </footer>
  )
}

export default Footer;