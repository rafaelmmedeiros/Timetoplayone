import React from 'react'
import { Segment, Form } from 'semantic-ui-react'

export const GrupoForm = () => {
    return (
        <Segment>
            <Form>
                <Form.Input placeholder='Titulo' />
                <Form.TextArea rows={2} placeholder='Descrição' />
            </Form>
        </Segment>
    )
}
