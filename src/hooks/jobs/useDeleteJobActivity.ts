import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

const deleteJobActivity = async ({ id }: { id: string }) => {
  const accessToken = localStorage.getItem('token')

  const res = await axios.delete(
    `${process.env.API_URL}/api/v3/portal/jobs/Jobactivity/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res
}
export const useDeleteJobActivity = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteJobActivity, {
    onError: () => {
      alert('there was an error')
    },
    onSettled: () => {
      queryClient.invalidateQueries('jobActivities')
    },
  })
}
