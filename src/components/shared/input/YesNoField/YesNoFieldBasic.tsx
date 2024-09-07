import { useField } from 'formik'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'shared/button'
import styled from 'styled-components'
import { VerticalGroup } from 'styles/styledComponents/containers'
import { ErrorMessege } from '../errorText.styled'

const ButtonContainer = styled.div<{
  error: boolean
  width?: string
}>`
  display: flex;
  justify-content: center;
  gap: 12px;
  width: ${({ width }) => (width ? width : '326px')};
  border: ${({ error }) => (error ? '1px solid red' : 'black')};
  padding: ${({ error }) => (error ? '2px 1px' : '')};
`

const YesNoFieldBasic = ({
  value,
  onChange,
}: {
  value: string | null
  onChange: (c: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <VerticalGroup>
      <ButtonContainer width="326px" error={false}>
        <Button
          variant={value === 'True' ? 'primary' : 'grey'}
          onClick={() => onChange('True')}
          overrideWidth="154px"
          overrideHeight="36px"
        >
          {t('Yes')}
        </Button>
        <Button
          variant={value === 'False' ? 'primary' : 'grey'}
          onClick={() => onChange('False')}
          overrideWidth="154px"
          overrideHeight="36px"
        >
          {t('No')}
        </Button>
      </ButtonContainer>
    </VerticalGroup>
  )
}

export default YesNoFieldBasic
