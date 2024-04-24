import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { selectAccessToken } from './selector';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { usePathname } from '../../utils/hooksHelper';


const propTypes = {
  children: PropTypes.element.isRequired,
  accessToken: PropTypes.string,
};

ClientContainer.propTypes = propTypes;
function ClientContainer({ children, accessToken }) {
  const navigate = useNavigate();
const path = usePathname();


  useEffect(() => {
    if (!accessToken) {
        toast.info("You need to login first");
        navigate('/login');
    }
  }, [accessToken, path])
  

  return children;
}

const mapStateToProps = createStructuredSelector({
    accessToken: selectAccessToken
})

export default connect(mapStateToProps)(ClientContainer);

