import { RecoilRoot } from 'recoil';
import styled from 'styled-components'
import { MainCanvas } from './components/MainCanvas';
import { FixedDom } from './components/dom/FixedDom';
function App() {
  return (
    <RecoilRoot>
      <Wrapper id='wrapper'>
        <MainCanvas />
        <FixedDom />
      </Wrapper>
    </RecoilRoot>
  )
}

export default App

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;