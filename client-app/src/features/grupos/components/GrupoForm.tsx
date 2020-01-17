import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

interface IProps {
    setEditMode: (editMode: boolean) => void;
}

export const GrupoForm: React.FC<IProps> = ({
    setEditMode
}) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Titulo' />
                <Form.TextArea rows={2} placeholder='Descrição' />
                <Button.Group widths={2}>
                    <Button 
                        basic color='olive' 
                        type='submit' 
                        content='Salvar' 
                    />
                    <Button 
                        onClick={() => setEditMode(false)}
                        basic color='red' 
                        type='button' 
                        content='Cancelar' 
                    />
                </Button.Group>            
            </Form>
        </Segment>
    )
}
