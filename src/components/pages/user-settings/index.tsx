import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik, FormikHelpers } from 'formik'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Container from '@mui/system/Container'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Button from 'shared/button'
import FormInputRow from 'shared/input/FormInputRow'

import { AbsoluteFullPage } from '../new-request/newRequest.styled'
import {
  StyledBackContainer,
  StyledBackWrapper,
  StyledDescription,
  StyledFont,
  StyledMainLabel,
  StyledLabelDescription,
  StyledSpan,
  TopComponent,
  FlexColumn,
  FontWeightSpan,
  GapFlex,
  MaxWidthDiv,
  FlexWidth,
  FlexColumnWidth,
} from './userSettings.styled'
import { useUserSettings } from 'hooks/user/useUserSettings'
import PageLoader from 'shared/page-loader'
import UserSettingsError from './UserSettingsError'
import { useTimeZoneOptions, useTimeZones } from 'hooks/dropdowns/useTimeZones'
import { useLanguages } from 'hooks/dropdowns/useLanguages'
import FormObserver from './FormObserver'
import { useUpdateUserSettings } from 'hooks/user/useUpdateUserSettings'
import { UserInfo } from 'models/profileSettings'
import { IOption } from '../../shared/select/BasicSelect'
import {
  emailString,
  fullNameString,
  requiredPhoneString,
} from 'constants/Validation/yupValidatiors'
import Footer from '../../footer/Footer'
import Navbar from '../../navbar'
interface IUserSettings {
  profileAvatar: string | null
  preferredFirstName: string | undefined
  preferredLastName: string | undefined
  contactEmail: string | undefined
  contactPhone: string | undefined
  preferredTimeZone: string | number | undefined
  preferredLanguage: number | null
}

type FormInputRowProps = {
  label: string
  helperText: string
  forms: {
    name: string
    type: string
    placeholder: string
    options?: IOption[]
  }[]
}
function UserSettings() {
  const [hasChanges, setHasChanges] = useState(false)
  const [profileSettingsData, setProfileSettings] = useState<
    FormInputRowProps[]
  >([])

  const navigate = useNavigate()
  const { t } = useTranslation()
  const timeZoneOptions = useTimeZoneOptions()
  const timeZones = useTimeZones()
  const languages = useLanguages()

  const userSettings = useUserSettings()
  const { mutate, isLoading } = useUpdateUserSettings()
  const formInitialValues: IUserSettings = {
    profileAvatar: null,
    preferredFirstName: userSettings?.data?.preferredFirstName,
    preferredLastName: userSettings?.data?.preferredLastName,
    contactEmail: userSettings?.data?.contactEmail,
    contactPhone: userSettings?.data?.contactPhone,
    preferredTimeZone: timeZones?.data?.find((el) => {
      return el.timezoneName === userSettings?.data?.preferredTimeZoneName
    })?.id,
    preferredLanguage: isNaN(Number(userSettings?.data?.preferredLanguage))
      ? null
      : Number(userSettings?.data?.preferredLanguage),
  }

  const createProfileSettings = (
    initials: string,
    timezoneOptions: IOption[] | undefined,
    languageOptions: IOption[] | undefined,
  ): FormInputRowProps[] => {
    return [
      {
        label: t('Name'),
        helperText: t(
          'How your name will show up within the portal and on requests',
        ),
        forms: [
          {
            name: 'preferredFirstName',
            type: 'text',
            placeholder: t('First Name'),
          },
          {
            name: 'preferredLastName',
            type: 'text',
            placeholder: t('Last Name'),
          },
        ],
      },
      {
        label: t('Email Address'),
        helperText: t('Email where notifications will be sent'),
        forms: [
          {
            name: 'contactEmail',
            type: 'text',
            placeholder: t('email'),
          },
        ],
      },
      {
        label: t('Mobile Number'),
        helperText: t('Number used for text notifications'),
        forms: [
          {
            name: 'contactPhone',
            type: 'text',
            placeholder: t('Phone Number'),
          },
        ],
      },
      {
        label: t('Timezone'),
        helperText: t(
          'Default timezone in making a new request and shown times in request listings',
        ),
        forms: [
          {
            name: 'preferredTimeZone',
            type: 'select',
            placeholder: t('timezone'),
            options: timezoneOptions,
          },
        ],
      },
      {
        label: t('Preferred Language'),
        helperText: t(
          'Preferred language on portal and in requests. Can be change on individual requests',
        ),
        forms: [
          {
            name: 'preferredLanguage',
            type: 'select',
            placeholder: t('language'),
            options: languageOptions,
          },
        ],
      },
    ]
  }

  useEffect(() => {
    if (userSettings?.status === 'success') {
      const initials = userSettings?.data
        ? `${userSettings?.data?.preferredFirstName
            .charAt(0)
            .toUpperCase()}${userSettings?.data?.preferredLastName
            .charAt(0)
            .toUpperCase()}`
        : ''
      const newSettings = createProfileSettings(
        initials,
        timeZoneOptions?.data,
        languages?.data,
      )

      setProfileSettings(newSettings)
    }
  }, [userSettings?.data, userSettings?.status])

  useEffect(() => {
    if (timeZones?.status === 'success') {
      const initials = userSettings?.data
        ? `${userSettings?.data?.preferredFirstName
            .charAt(0)
            .toUpperCase()}${userSettings?.data?.preferredLastName
            .charAt(0)
            .toUpperCase()}`
        : ''
      const newSettings = createProfileSettings(
        initials,
        timeZoneOptions?.data,
        languages?.data,
      )
      setProfileSettings(newSettings)
    }
  }, [timeZoneOptions?.data, timeZones?.status])

  useEffect(() => {
    if (languages?.status === 'success') {
      const initials = userSettings?.data
        ? `${userSettings?.data?.preferredFirstName
            .charAt(0)
            .toUpperCase()}${userSettings?.data?.preferredLastName
            .charAt(0)
            .toUpperCase()}`
        : ''
      const newSettings = createProfileSettings(
        initials,
        timeZoneOptions?.data,
        languages?.data,
      )
      setProfileSettings(newSettings)
    }
  }, [languages?.data, languages?.status])
  const handleBackButton = () => {
    navigate('/')
  }

  const errMsj = {
    nameRequired: t('Name is required'),
    lastNameRequired: t('Last name is required'),
  }
  const userSettingsValidationSchema = Yup.object().shape({
    preferredFirstName: fullNameString.required(errMsj.nameRequired),
    preferredLastName: fullNameString.required(errMsj.lastNameRequired),
    contactEmail: emailString,
    contactPhone: requiredPhoneString.nullable(),
    preferredTimeZone: Yup.string().required(),
    preferredLanguage: Yup.number().required(),
  })
  if (
    userSettings.status === 'loading' ||
    timeZones.status === 'loading' ||
    languages.status === 'loading'
  ) {
    return (
      <AbsoluteFullPage>
        <Navbar />
        <PageLoader />
      </AbsoluteFullPage>
    )
  }
  if (userSettings.status === 'error') {
    return (
      <AbsoluteFullPage>
        <Navbar />
        <UserSettingsError
          //eslint-disable-next-line
          //@ts-ignore
          statusCode={userSettings.error?.response.status}
        />
      </AbsoluteFullPage>
    )
  }
  if (userSettings.status === 'success' && profileSettingsData)
    return (
      <AbsoluteFullPage>
        <Navbar />
        <StyledBackContainer>
          <Button onClick={handleBackButton} variant="back" size="sm">
            <StyledBackWrapper>
              {' '}
              <ArrowBackIcon fontSize="small" />
              <StyledSpan>{t('Back')}</StyledSpan>
            </StyledBackWrapper>
          </Button>
        </StyledBackContainer>
        <Formik
          initialValues={formInitialValues}
          validationSchema={userSettingsValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          onSubmit={(values: any, { setSubmitting }: FormikHelpers<any>) => {
            const newSettings = { ...values }
            const currentSettings: UserInfo = {
              ...userSettings?.data,
            }
            mutate(
              {
                userSettings: newSettings,
                user: currentSettings,
                timezone: timeZones?.data?.find(
                  (elem) => elem.id === newSettings.preferredTimeZone,
                )?.timezoneCode,
              },

              {
                onError: () => {
                  window.alert('error updating user')
                },
                onSuccess: () => {
                  setHasChanges(false)
                },
              },
            )
          }}
        >
          {(props) => (
            <Container sx={{ paddingBottom: '40px' }}>
              <FormObserver setHasChanges={setHasChanges} />
              <TopComponent>
                <FlexColumn>
                  <StyledFont>{t('Profile Settings')}</StyledFont>
                  <StyledDescription>
                    {t(
                      'Select the kinds of notification you get about your activites and recommendations.',
                    )}
                  </StyledDescription>
                </FlexColumn>
                <Button
                  onClick={props.handleSubmit}
                  variant="primary"
                  size="lg"
                  type="submit"
                  overrideWidth="179px"
                  disabled={!hasChanges}
                >
                  <FontWeightSpan>
                    {!isLoading ? t('Save Profile') : t('Loading')}
                  </FontWeightSpan>
                </Button>
              </TopComponent>
              <Divider sx={{ marginTop: '2.5rem', marginBottom: '2.5rem' }} />
              <GapFlex>
                <MaxWidthDiv>
                  <StyledMainLabel>{t('Personal Information')}</StyledMainLabel>
                  <StyledLabelDescription>
                    {t(
                      'Get emails on specific updates to your job requests. You can turn off each notification type to limit the amount of emails you receive.',
                    )}
                  </StyledLabelDescription>
                </MaxWidthDiv>
                <FlexWidth>
                  <FlexColumnWidth>
                    {profileSettingsData.map((group: any, i: any) => (
                      <FormInputRow group={group} key={i} />
                    ))}
                  </FlexColumnWidth>
                </FlexWidth>
              </GapFlex>
            </Container>
          )}
        </Formik>
        <div style={{ paddingTop: '100px' }}>
          <Footer showVersion={true} />
        </div>
      </AbsoluteFullPage>
    )
}

export default UserSettings
