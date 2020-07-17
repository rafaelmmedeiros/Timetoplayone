import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps } from 'semantic-ui-react'
import { NumberPicker } from 'react-widgets'

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps { }

const NumberAreaInput: React.FC<IProps> = ({ input
    

}) => {
    return (
        <NumberPicker/>
    )
}

export default NumberAreaInput
