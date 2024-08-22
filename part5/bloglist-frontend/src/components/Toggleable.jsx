import { forwardRef, useImperativeHandle, useState } from "react"

const Toggleable = forwardRef(({ children, btnText, }, ref) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(v => !v)
    }

    useImperativeHandle(ref, () => ({
        toggleVisibility
    }))

    return (
        <div>

            <div style={{ display: visible ? 'none' : '' }}>
                <button onClick={toggleVisibility}>{btnText}</button>
            </div>
            <div style={{ display: !visible ? 'none' : '' }}>
                {children}
                <br />
                <button onClick={toggleVisibility}>Cancel</button>
            </div>

        </div>
    )
})

export default Toggleable;
