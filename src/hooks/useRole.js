import { useQuery } from '@tanstack/react-query'
import useAuth from '../Pages/useAuth/useAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user, loader } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = '', isLoader } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`)
      return data.role
    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoader]
}

export default useRole