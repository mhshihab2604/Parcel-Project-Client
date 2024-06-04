import useAuth from '../../useAuth/useAuth'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../Components/LoadingSpinner'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, loader } = useAuth() || {}
  const [role, isLoading] = useRole()

  console.log(user)
  if (isLoading || loader) return <LoadingSpinner />
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://i.ibb.co/wMCyDmL/Car-Deliery.jpg'
          className='w-full mb-4 rounded-t-lg h-52'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-28 w-28  border-2 border-white '
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs text-white bg-[#D1A054] rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-lg font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>

              <div>
                <Link to="/dashboard/updateProfile">
                  <button className='bg-[#D1A054] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                    Update Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile