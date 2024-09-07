import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import axios from 'axios'
import { IUploadedFile } from 'models/jobDashboard'
import SaveIcon from 'shared/icons/SaveIcon'
import { saveAs } from 'file-saver'

type Props = {
  file: IUploadedFile
}

export const fileType = (extension: string) => {
  const abr = extension.toLowerCase()
  switch (abr) {
    case 'pdf':
      return 'application/pdf'
    case 'jpg':
      return 'image/jpeg'
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
  }
}
const fetchFile = async (fileId: string): Promise<any> => {
  const accessToken = localStorage.getItem('token')

  const res = await axios.get(
    `${process.env.API_URL}/api/v3/portal/job/file?DocumentId=${fileId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'blob',
    },
  )
  const { data } = res

  return data
}
const FileWithDownload = (props: Props) => {
  const file = props.file

  const handleDownloadFile = async (file: IUploadedFile) => {
    const downloaded = await fetchFile(file.id)
    const blob = new Blob([downloaded], { type: fileType(file.extension) })
    saveAs(blob, file.name, { autoBom: true })
  }
  
  return (
    <div>
      <Tooltip title="download file">
        <IconButton onClick={() => handleDownloadFile(file)}>
          <SaveIcon />
        </IconButton>
      </Tooltip>

      <span>
        {`${file.name.slice(0, 25)}${file.name.length > 25 ? '...' : ''}`}
      </span>
    </div>
  )
}
export default FileWithDownload
