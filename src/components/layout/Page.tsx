import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;

  @media (pointer:none), (pointer:coarse) {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`

export default Page
