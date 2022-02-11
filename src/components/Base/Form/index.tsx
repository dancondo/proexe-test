import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import BaseButton from '../Button';

interface FormProps {
  loading?: boolean
  fields: FormField[]
  onSubmit: () => void
  onCancel?: () => void
}

const BaseForm: React.FC<FormProps> = ({
  fields,
  loading,
  onSubmit,
  onCancel,
}) => {
  const [formTouched, setFormTouched] = useState(false)

  const isDisabled = () => !!fields.find((field) => !!field.error);

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormTouched(true)
    !isDisabled() && onSubmit()
  };

  return (
    <Form
      onSubmit={onClick}
      data-testid="base-form"
    >
      {
        fields.map((field: FormField) => (
          <Form.Group
            key={field.label}
            className="mb-3"
          >
            <Form.Label>
              {field.label}
            </Form.Label>
            <Form.Control
              value={field.value}
              isInvalid={formTouched && !!field.error}
              onChange={(e) => field.setValue(e.target.value)}
            />
            <Form.Text
              className={`text-danger ${formTouched && !!field.error ? '' : 'invisible'}`}
            >
              {field.error}.
            </Form.Text>
          </Form.Group>
        ))
      }
      <div>

        <Row
          className="justify-content-end"
        >
          {
            onCancel && (
              <Col
                xs={6}
                sm={4}
                md={3}
                lg={2}
              >
                <Row
                  className="g-0"
                >
                  <BaseButton
                    variant="outline-danger"
                    onClick={onCancel}
                  >
                    Cancel
                  </BaseButton>
                </Row>
              </Col>
            )
          }
          <Col
            xs={6}
            sm={4}
            md={3}
            lg={2}
          >
            <Row
              className="g-0"
            >
              <BaseButton
                type="submit"
                loading={loading}
              >
                Submit
              </BaseButton>
            </Row>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default BaseForm;
