import axios from 'axios'
import { IUploadedFile } from 'models/jobDashboard'
import { useMutation, useQueryClient } from 'react-query'

const deleteFile = async ({
  id,
  fileId,
  level,
}: {
  id: number
  fileId: string
  level: IUploadedFile['owner']
}) => {
  const accessToken = localStorage.getItem('token')

  if (level === 'JOB') {
    const res = await axios.delete(
      `${process.env.API_URL}/api/v3/portal/job/fileupload`,
      {
        data: {
          jobId: id,
          JobUploadFileId: fileId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return res
  } else {
    const res = await axios.delete(
      `${process.env.API_URL}/api/v3/portal/jobactivity/fileupload`,
      {
        data: {
          JobActivityId: id,
          JobUploadFileId: fileId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return res
  }
}
export const useDeleteFileFromJob = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteFile, {
    onError: () => {
      alert('there was an error deleting file')
    },
  })
}
