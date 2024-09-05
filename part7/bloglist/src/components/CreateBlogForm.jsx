import PropTypes from 'prop-types'
import { Button, Col, Form, Row } from 'react-bootstrap'

const CreateBlogForm = ({ submit }) => {
  const submitForm = (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    submit(blog)
    event.target.reset()
  }

  return (
    <div className='bg-light p-3'>
      <Form onSubmit={submitForm}>
        <Row>
          <Col>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control name="title" placeholder="Blog's Title" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="author" className="mb-3">
              <Form.Label>Author:</Form.Label>
              <Form.Control name="author" placeholder="Blog's Author" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="url" className="mb-3">
              <Form.Label>Url:</Form.Label>
              <Form.Control type='url' name="url" placeholder="Blog's url" />
            </Form.Group>
          </Col>
        </Row>

        <Button type='submit'>Create</Button>
      </Form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default CreateBlogForm
