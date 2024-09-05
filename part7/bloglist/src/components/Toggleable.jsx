import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = forwardRef(({ children, btnText }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((v) => !v)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <Button onClick={toggleVisibility}>{btnText}</Button>
      </div>
      <div style={{ display: !visible ? 'none' : '' }}>
        {children}
        <br />
        <div className='text-end'>
          <Button variant='dark' onClick={toggleVisibility}>Cancel</Button>
        </div>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  btnText: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default Toggleable
