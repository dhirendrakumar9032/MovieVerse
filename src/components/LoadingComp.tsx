
import loadingImg from '../resources/laoding.svg'
import '../styles/App.scss'

const LoadingComp = () => {
  return <div className='loading'>
    <img src={loadingImg} alt='loading' />
    <div className='loadingText'>Loading
      <span className='dot dot1'>.</span>
      <span className='dot dot2'>.</span>
      <span className='dot dot3'>.</span>
    </div>
  </div>
}

export default LoadingComp