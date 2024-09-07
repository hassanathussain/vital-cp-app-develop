import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

const deleteJob = async ({ id }: { id: string }) => {
  const accessToken = localStorage.getItem('token')

  const res = await axios.delete(
    `${process.env.API_URL}/api/v3/portal/jobs/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res
}
export const useDeleteJob = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteJob, {
    onError: () => {
      alert('there was an error deleting job')
    },
    onSettled: () => {
      queryClient.invalidateQueries('jobs')
    },
  })
}
