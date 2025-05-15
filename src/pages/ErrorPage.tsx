import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/utils';
import { SectionContainer, SectionHeader } from '@/components'


const ErrorPage = () => {


  return (
      <SectionContainer>
        <SectionHeader title='Error Page' showTrash={false} />
        <div className='flex flex-col items-center'>
          <span className='w-1/3 text-center mb-5 text-lg'>
            Either an error has occured, or the page you are looking for does not exist.
          </span>
          <NavLink
            to={ROUTES.HOME}
          >
            <span className='text-primary underline text-xl font-medium mb-5'>
              Return to calculators
            </span>
          </NavLink>
        </div>
      </SectionContainer>
  )
}

export default ErrorPage;