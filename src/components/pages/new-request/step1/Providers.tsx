import React, { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'

import BasicSelect from 'shared/select/BasicSelect'
import {
  StyledDescription,
  StyledLabel,
} from '../../user-settings/userSettings.styled'
import { IServiceType, useServiceTypes } from 'hooks/dropdowns/useServiceTypes'
import {
  IServiceDetails,
  useServiceSubTypes,
} from 'hooks/dropdowns/useServiceSubTypes'
import { useTranslation } from 'react-i18next'
import { AttendeeInfo, ContactInfo } from 'hooks/useStepForm'
import { DynamicFields } from 'shared/dynamic-fields'

function Providers() {
  const { t } = useTranslation()
  const { values } = useFormikContext<{
    attendees: AttendeeInfo[]
    prefProviders: ContactInfo[]
    consumers: ContactInfo[]
    isActive: boolean
    serviceType: number | null
    serviceDescription: number | null
  }>()
  const serviceTypes = useServiceTypes()
  const serviceDetails = useServiceSubTypes(
    values.serviceType ? values.serviceType : -1,
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '300px',
          }}
        >
          <StyledLabel>{t('Service type *')}</StyledLabel>
          <StyledDescription>
            {t('What type of service is needed for this request')}
          </StyledDescription>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <BasicSelect
            backgroundColor="white"
            width="326px"
            height="42px"
            name="serviceType"
            options={serviceTypes?.data ? serviceTypes?.data : []}
            label="Service type *"
          />
          {values?.serviceType ? (
            <BasicSelect
              backgroundColor="white"
              width="326px"
              height="42px"
              name="serviceDescription"
              label=""
              options={serviceDetails?.data ? serviceDetails?.data : []}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <DynamicFields serviceSubTypeId={values.serviceDescription} />
    </div>
  )
}

export default Providers
