import { useNavigate } from 'react-router-dom'
import React from 'react'

import Navbar from 'components/navbar'
import Footer from 'components/footer/Footer'
import Button from 'shared/button'

import FourOhFourPlug from 'assets/images/auth/404-plug.svg'
import { FlexOhFour, OopsText, ThisIsNotTheDroid } from './auth.styled'

function NotFound() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <FlexOhFour>
        <img src={FourOhFourPlug} alt="404 plug" />
        <OopsText>Oops!</OopsText>
        <ThisIsNotTheDroid>
          We couldn't find the page you're looking for.
        </ThisIsNotTheDroid>
        <Button
          onClick={handleClick}
          variant={'primary'}
          size={'lgwide'}
          fontSize={'16px'}
        >
          Back to Home
        </Button>
      </FlexOhFour>
      <Footer />
    </>
  )
}

export default NotFound
