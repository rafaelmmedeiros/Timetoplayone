import React from 'react'
import { Item, Grid, Segment, Label, Rating, GridRow, GridColumn, Progress } from 'semantic-ui-react'

export const EstudoList = () => {
    return (
        <Segment clearing>
            <Item.Group divided  >
                <Item>
                    <Item.Content>
                        <Label color='red' ribbon >
                            Scales
                        </Label>
                        <Item.Header >
                            Pentatonica em Am Pattern 4
                        </Item.Header>
                        <Item.Meta>
                            Livro de fulano de tal, exercicio 12.
                        </Item.Meta>
                        <Item.Description>
                            <Grid divided padded>
                                <Grid.Row color='blue'>
                                    <GridColumn color="brown" width={4}>TEste</GridColumn>
                                    <GridColumn width={4}>TEste</GridColumn>
                                    <GridColumn width={4}>TEste</GridColumn>
                                </Grid.Row>
                                <Grid.Row>
                                    <GridColumn width={6}>
                                        <Progress percent={50} indicating />
                                    </GridColumn>
                                    <GridColumn width={4}>TEste</GridColumn>
                                    <GridColumn width={4}>TEste</GridColumn>
                                </Grid.Row>



                                {/* <Grid.Column width={4}>
                                    <Grid.Row>150 BPM</Grid.Row>
                                    <Grid.Row>8 Compassos</Grid.Row>
                                    <Grid.Row>15 Minutos</Grid.Row>
                                    <Rating icon='star' defaultRating={3} maxRating={5} disabled />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Grid.Row>10 dias</Grid.Row>
                                    <Grid.Row>9 Práticas</Grid.Row>
                                    <Grid.Row>90 Minutos</Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    Col3
                                </Grid.Column> */}
                            </Grid>
                        </Item.Description>
                        <Item.Extra>
                            Fazer esse caralho de exercicio em todas otnalidades e sem reclamar, com palhetada Tecnicas.
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
}
