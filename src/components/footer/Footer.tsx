import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as React from 'react'

import { version } from 'utils/version'
import { t } from 'i18next'

interface Props {
  showVersion?: boolean
}

export const StyledContainer = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  left: 0;
`

const Seperator = styled.hr`
  height: 1px;
  background-color: #040809;
  opacity: 8%;
  margin: 0px 20px;
`

export const FlexFootDiv = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 12px;
  font-stretch: normal;
  font-style: normal;
  line-height: 18px;
  letter-spacing: normal;
  margin: 20px;
`

const StyledLink = styled(Link)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  text-decoration-line: underline;
  line-height: 18px;
  //color: rgba(0, 0, 0, 0.75);
  color: black;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

const createCopyRight = () => {
  const currentYear = new Date().getFullYear()
  return `© ${currentYear} Sorenson Communications. All Rights Reserved`
}

function Footer(props: Props) {
  const { showVersion } = props
  const sorensonCopyRight = createCopyRight()

  return (
    <StyledContainer>
      <Seperator></Seperator>
      <FlexFootDiv>
        <p>{sorensonCopyRight}</p>
        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginRight: '15px',
            alignItems: 'center',
          }}
        >
          {showVersion && <p>Version {version}</p>}
          <a
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '12px',
              textAlign: 'center',
              textDecorationLine: 'underline',
              lineHeight: '18px',
              color: 'black',
              display: 'block',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.open('https://sorenson.com/legal/privacy-policy/')
            }}
          >
            {t('Privacy Policy')}
          </a>
        </div>
      </FlexFootDiv>
    </StyledContainer>
  )
}

export default Footer
