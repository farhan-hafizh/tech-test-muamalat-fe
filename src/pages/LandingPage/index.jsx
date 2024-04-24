import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect';
import { selectLoggedInUser } from '../../containers/ClientContainer/selector';
import { connect, useDispatch } from 'react-redux';
import './style.css';
import { setAccessTokenAction, setLoggedInUserAction, setRefreshTokenAction } from '../../containers/ClientContainer/actions';

const propTypes = {
  userData: PropTypes.object
};

function LandingPage({ userData }) {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(setRefreshTokenAction(null));
    dispatch(setAccessTokenAction(null));
    dispatch(setLoggedInUserAction(null));
  };

  return (
    <div className="landing-page">
      <div className="flex h-screen">
      <div className="m-auto">
          <h1 className="fw-light text-white m-0 text-align: center; text-4xl">Welcome, {userData?.username}</h1>
          <div className='btn bg-white rounded-xl m-5 hover:cursor-pointer' onClick={handleLogout}>Logout</div>
      </div>
  </div>
  </div>
  )
}

LandingPage.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  userData: selectLoggedInUser
})

export default connect(mapStateToProps)(LandingPage)
