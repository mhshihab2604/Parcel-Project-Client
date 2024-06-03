import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `${
          isActive ? 'bg-white' : ''
        }`
      }
    >
      

      <span className=''>{label}</span>
    </NavLink>
  )
}
MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
}

export default MenuItem