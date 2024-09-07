import styled from 'styled-components'

export const Styledh1 = styled.h1`
  color: black;
  text-align: left;
  font-size: 27px;
  font-weight: 700;
  //font-weight: bold;
`

export const Styledp = styled.div`
  text-align: left;
  font-size: 21px;
  font-weight: 400;
`

export const VerticalGroup = styled.div<{
  gap?: string
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : '6px')};
`
