import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

import SettingsIcon from 'shared/icons/SettingsIcon'
import FeedbackOutlinedIcon from 'shared/icons/FeedbackOutlinedIcon'
import logo from 'assets/images/logo/lockup-horizontal-socasi-teal-midnightBlue.svg'
import {
  Logo,
  RightHandSideContainer,
  FeedbackContainer,
  StyledLink,
} from './navbar.styled'
import { AUTH0_AUDIENCE, AUTH0_SCOPE } from 'constants/environment'
import { useUserSettings } from 'hooks/user/useUserSettings'

export const openSupportForm = () => {
  const i18nextLng = localStorage.getItem('i18nextLng')
  if (i18nextLng === 'es') {
    window.open(
      'https://app.smartsheet.com/b/form/3d8acaae706e4edfa09ae3e506a6f48c',
      '_blank',
    )
  } else {
    window.open(
      'https://app.smartsheet.com/b/form/1759fae69bae4b1089abc227ab699d69',
      '_blank',
    )
  }
}

function Navbar() {
  const location = useLocation()

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()
  const { logout } = useAuth0()
  const { t } = useTranslation()
  const [hover, setHover] = useState<boolean>(false)
  const [initials, setInitials] = useState<string>('')
  const handleMenuSettingsClick = () => {
    popupState.close()
    navigate('/profile-settings')
  }

  const hideIcons = location.pathname === '/terms-acceptance'

  const handleMenuLogoutClick = () => {
    localStorage.clear()
    popupState.close()
    window.localStorage.clear()
    logout({ returnTo: window.location.origin })
  }
  const setToken = async () => {
    const accessToken = await getAccessTokenSilently({
      AUTH0_AUDIENCE,
      AUTH0_SCOPE,
    })
    window.localStorage.setItem('token', accessToken)
  }
  const userSettings = useUserSettings()
  useEffect(() => {
    if (userSettings?.data?.preferredFirstName)
      setInitials(
        `${userSettings?.data?.preferredFirstName.charAt(
          0,
        )}${userSettings?.data?.preferredLastName.charAt(0)}`,
      )
  }, [userSettings.data])

  useEffect(() => {
    setToken()
  }, [])
  return (
    <Toolbar sx={{ height: '70px' }}>
      <Link to={'/'}>
        <Logo alt="vital-logo" src={logo} />
      </Link>
      {!hideIcons && (
        <RightHandSideContainer>
          <FeedbackContainer
            id="feedback"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <FeedbackOutlinedIcon fill={hover ? 'black' : '#006A62'} />
            <Typography sx={{ fontSize: '14px' }}>{t('Feedback')}</Typography>
          </FeedbackContainer>
          <StyledLink to={'/profile-settings'}>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </StyledLink>
          <Avatar
            sx={{
              width: '32px',
              height: '32px',
              background: '#E3E3E5',
              borderRadius: '200px',
              flex: 'none',
              order: 1,
              flexGrow: 0,
              color: '#595E61',
              fontSize: '12px',
              lineHeight: '18px',
              boxSizing: 'border-box',
              '&:hover': {
                border: '1.5px solid #00A297',
              },
            }}
          >
            <Button
              sx={{
                color: '#595E61',
              }}
              {...bindTrigger(popupState)}
            >
              {initials}
            </Button>
            <Menu sx={{ margin: '4px 10px 0px 0px' }} {...bindMenu(popupState)}>
              <MenuItem
                sx={{ marginRight: '46px' }}
                onClick={handleMenuSettingsClick}
              >
                {t('Profile Settings')}
              </MenuItem>
              <MenuItem onClick={openSupportForm}>
                {t('Contact Support')}
              </MenuItem>
              <MenuItem onClick={handleMenuLogoutClick}>{t('Logout')}</MenuItem>
            </Menu>
          </Avatar>
        </RightHandSideContainer>
      )}
    </Toolbar>
  )
}

export default Navbar
