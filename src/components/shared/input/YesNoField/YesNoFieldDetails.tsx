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

const YesNoFieldDetails = (props: any) => {
  const { t } = useTranslation()
  const [field, meta, helpers] = useField(props)
  const { setValue } = helpers
  const { error } = props
  return (
    <VerticalGroup>
      <ButtonContainer error={false} width={props.width}>
        <Button
          variant={field?.value && (field?.value === 'True' || field?.value === 'true') ? 'primary' : 'grey'}
          onClick={() => setValue('True')}
          overrideWidth="154px"
          overrideHeight="36px"
        >
          {t('Yes')}
        </Button>
        <Button
          variant={
            field?.value && (field?.value === 'False' || field?.value === 'false') ? 'primary' : 'grey'
          }
          onClick={() => setValue('False')}
          overrideWidth="154px"
          overrideHeight="36px"
        >
          {t('No')}
        </Button>
      </ButtonContainer>
    </VerticalGroup>
  )
}

export default YesNoFieldDetails
