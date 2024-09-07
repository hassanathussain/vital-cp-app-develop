import React, { useEffect, useRef, useState } from 'react'

import Button from '../button'
import UploadIcon from '../icons/UploadIcon'
import TrashIcon from 'shared/icons/TrashIcon'
import { Document, Page } from 'react-pdf'
import IconButton from '@mui/material/IconButton'
import { useFormikContext } from 'formik'
import { FormattedFile } from 'hooks/jobs/useCreateJob'
import { t } from 'i18next'
import Tooltip from '@mui/material/Tooltip'
import { Step1FormInputs } from 'hooks/useStepForm'
import { IFile } from 'src/components/pages/new-request/step1/Step1'
import { forEach } from 'lodash'

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
interface FileInputProps {
  files: IFile[]
  setFiles: React.Dispatch<React.SetStateAction<IFile[]>>
}
function FileInput({ files, setFiles }: FileInputProps) {
  const formik = useFormikContext<Step1FormInputs>()

  const inputRef = useRef()

  const existing = formik?.values?.files
  const [existingFiles, setExistingFiles] = useState<FormattedFile[]>(
    existing || [],
  )
  //eslint-disable-next-line
  //@ts-ignore
  const uploaded = formik?.values?.uploadedFile
  const [uploadedFiles, setUploadedFiles] = useState<FormattedFile[]>(
    uploaded || [],
  )

  //resets existing files when clear occures
  useEffect(() => {
    if (existing?.length === 0 && existingFiles.length > 0) {
      setExistingFiles([])
    }
  }, [existing])

  function handleSubmit(e: any) {
    const inputFiles = e.target.files

    if (inputFiles.length === 0) {
      return
    } else {
      forEach(inputFiles, (file: any) => {
        if (file && file?.size <= 10e6) {
          const fileExists =
            files.some((f: IFile) => f.name === file.name) ||
            existingFiles.some((f: FormattedFile) => f.name === file.name) ||
            uploadedFiles.some((f: FormattedFile) => f.name === file.name)
          if (!fileExists) {
            setFiles((prev: IFile[]) => {
              return [...prev, file]
            })
          } else {
            window.alert(`${t('File')} ${file.name} ${t('already exists')}`)
          }
        } else {
          window.alert(
            `${file.name} is too large. Please upload a file smaller than 10MB`,
          )
        }
      })
    }
  }
  function handleRemove(index: number) {
    setFiles((prev: IFile[]) => {
      return prev.filter((file: IFile, i: number) => i !== index)
    })
    // remove file from the input elements .files
    const input = document.getElementById('file') as HTMLInputElement
    const InputFiles = input.files

    if (InputFiles) {
      const newFiles: any[] = []
      new Array(InputFiles?.length - 1).forEach((_, i) => {
        if (i === index) {
          return
        }
        return newFiles.push(InputFiles[i])
      })

      const newFileList = new DataTransfer()
      newFiles.forEach((f) => newFileList.items.add(f))
      input.files = newFileList.files
    }
  }

  const getExtension = (type: File['type']) => {
    if (type === 'application/pdf') {
      return 'pdf'
    }
    if (type === 'image/png') {
      return 'png'
    }
    if (type === 'image/jpeg') {
      return 'jpeg'
    }
    if (type === 'image/jpg') {
      return 'jpg'
    }
    return 'unknown'
  }

  const updatefiles = async () => {
    const base64EncodedFiles = await Promise.all(
      files.map(async (file: IFile) => {
        try {
          const result = (await toBase64(file)) as string
          const base64Arr = result.split(',')
          return base64Arr[1]
        } catch (error) {
          console.error(error)
          return
        }
      }),
    )

    const allFiles: FormattedFile[] = [...existingFiles]

    const filesToPost: FormattedFile[] = files.map((file: IFile, i) => ({
      name: file.name,
      extension: getExtension(file.type),
      file: base64EncodedFiles[i] as string,
    }))
    allFiles.push(...filesToPost)

    formik.setFieldValue('files', allFiles)
  }
  const handleRemoveFile = (file: FormattedFile) => {
    setExistingFiles((prev: FormattedFile[]) => {
      return prev.filter((f: FormattedFile) => f.name !== file.name)
    })
  }

  useEffect(() => {
    updatefiles()
  }, [files, existingFiles])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <input
          onChange={handleSubmit}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, application/pdf"
          style={{ display: 'none' }}
          id="file"
          name="file"
        />
        <div>
          <Button
            variant="primary"
            fontSize="18px"
            size="lg"
            overrideWidth="300px"
            overrideHover="#00a297"
            overrideHeight="48px"
            onClick={() => {
              document?.getElementById('file')?.click()
            }}
          >
            <UploadIcon /> <span>{t('Upload Documents')}</span>
          </Button>
        </div>
        {existingFiles?.map((file: FormattedFile, i: number) => (
          <div key={file.name}>
            <Tooltip title="remove file">
              <IconButton onClick={() => handleRemoveFile(file)}>
                <TrashIcon />
              </IconButton>
            </Tooltip>

            <span>
              {`${file.name.slice(0, 25)}${file.name.length > 25 ? '...' : ''}`}
            </span>
          </div>
        ))}

        {files?.map((file: IFile, i: number) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            key={file?.name}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <IconButton onClick={() => handleRemove(i)}>
                <TrashIcon />
              </IconButton>
              <span style={{ fontSize: '12px' }}>
                {file?.name.slice(0, 15)}
              </span>
            </div>
            <div
              style={{
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
              }}
            >
              {file?.type === 'application/pdf' ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Document file={file}>
                  <Page
                    pageIndex={0}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    width={122}
                  />
                </Document>
              ) : (
                <img
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ width: '122px', height: '158px' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default FileInput
