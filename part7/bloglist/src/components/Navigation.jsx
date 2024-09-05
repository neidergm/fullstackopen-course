import { useDispatch, useSelector } from 'react-redux'
import { clearUserData } from '../store/user.slice'
import { Link } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const Navigation = () => {
    const user = useSelector(s => s.user)

    const dispatch = useDispatch()
    const closeSession = () => {
        dispatch(clearUserData())
    }

    return (
        <Navbar expand="lg" className="bg-primary" variant='dark' sticky='top' >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="gap-3 me-auto">
                        <Nav.Link as={Link} to='/'>
                            Blogs
                        </Nav.Link>
                        <Nav.Link as={Link} to='/users'>
                            Users
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className='gap-4 align-items-center flex-row'>
                    <Navbar.Text className='flex-grow-1'>
                        Signed in as: <b>{user.name}</b>
                    </Navbar.Text>
                    <div>
                        <Button variant='dark' onClick={closeSession}>logout</Button>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation