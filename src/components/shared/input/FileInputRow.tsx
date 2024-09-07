import React from 'react'
import { FormRowsContainer } from './FormInputRow/inputRow.styles'
import { VerticalGroup } from 'styles/styledComponents/containers'
import FileInput from './FileInput'
import {
  StyledDescription,
  StyledLabel,
} from '../../pages/user-settings/userSettings.styled'
import { t } from 'i18next'
import { IFile } from 'src/components/pages/new-request/step1/Step1'

interface FileInputRowProps {
  files: IFile[]
  setFiles: React.Dispatch<React.SetStateAction<IFile[]>>
}
const FileInputRow = ({ files, setFiles }: FileInputRowProps) => {
  return (
    <div>
      <FormRowsContainer>
        <VerticalGroup style={{ width: '356px' }}>
          <StyledLabel>{t('Additional Documents')}</StyledLabel>

          <StyledDescription>
            {t('(PDF, JPG, JPEG, and PNG files allowed)')}
          </StyledDescription>
        </VerticalGroup>
        <VerticalGroup>
          <FileInput files={files} setFiles={setFiles} />
        </VerticalGroup>
      </FormRowsContainer>
    </div>
  )
}

export default FileInputRow
