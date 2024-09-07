import { IOption } from 'shared/select/BasicSelect'

export const createProfileSettings = (
  initials: string,
  timezoneOptions: IOption[] | undefined,
  languageOptions: IOption[] | undefined,
) => {
  return [
    {
      label: 'Profile Picture',
      helperText: 'JPG, GIF or PNG. Max size of 800K',
      forms: [
        {
          name: 'profileAvatar',
          type: 'avatarInput',
          placeholder: 'img',
          initials: initials,
        },
      ],
    },
    {
      label: 'Name',
      helperText:
        'How your name will show up within the portal and on requests',
      forms: [
        {
          name: 'preferredFirstName',
          type: 'text',
          placeholder: 'First Name',
        },
        {
          name: 'preferredLastName',
          type: 'text',
          placeholder: 'Last Name',
        },
      ],
    },
    {
      label: 'Email Address',
      helperText: 'Email where notifications will be sent',
      forms: [
        {
          name: 'contactEmail',
          type: 'text',
          placeholder: 'email',
        },
      ],
    },
    {
      label: 'Mobile Number',
      helperText: 'Number used for text notifications',
      forms: [
        {
          name: 'contactPhone',
          type: 'text',
          placeholder: 'Phone Number',
        },
      ],
    },
    {
      label: 'Timezone',
      helperText:
        'Default timezone in making a new request and shown times in request listings',
      forms: [
        {
          name: 'preferredTimeZone',
          type: 'select',
          placeholder: 'timezone',
          options: timezoneOptions,
        },
      ],
    },
    {
      label: 'Preferred Language',
      helperText:
        'Preferred language on portal and in requests. Can be change on individual requests',
      forms: [
        {
          name: 'preferredLanguage',
          type: 'select',
          placeholder: 'language',
          options: languageOptions,
        },
      ],
    },
    // {
    //   label: 'Reset Password',
    //   helperText: 'Anytime a new request is made',
    //   forms: [
    //     {
    //       name: 'currentPassword',
    //       type: 'password',
    //       helperText: 'Current Password',
    //     },
    //     {
    //       name: 'newPassword',
    //       type: 'password',
    //       helperText: 'New Password',
    //     },
    //     {
    //       name: 'confirmPassword',
    //       type: 'password',
    //       helperText: 'Confirm New Password',
    //     },
    //   ],
    // },
  ]
}
