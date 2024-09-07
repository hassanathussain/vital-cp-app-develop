import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const RightHandSideContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    align-items: center;
    gap: 18px;
    padding-right: 10px;
  `,
  Logo = styled.img`
    height: 25px;
    padding: 5px;
  `,
  StyledLink = styled(Link)`
    text-decoration: none;
  `,
  LinkFeedback = styled(Link)`
    text-decoration: none;
    display: flex;
    color: black;
    align-items: center;
  `,
  FeedbackContainer = styled.div`
    padding: 6px 22px;
    border-radius: 5px;
    display: flex;
    border: 1px solid #d9d9d9;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #006a62;
    font-size: 14px;
    cursor: pointer;
    :hover {
      color: black;
      background-color: #04080908;
    }
  `
