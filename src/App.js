import React, { useState, useEffect } from "react"

import './App.css'
import { Container, TextField, Button, CircularProgress } from '@material-ui/core'
import { data } from './constans'
import { Request } from './api'
import { ContainerElements, QuestionItemElement, InputItemElement, ContainerButtons, Title } from './style.app'
const arrayAddQuestion = []

function App(props) {
  const [indexQ, setIndexQ] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log(indexQ, '-', data)
  }, [indexQ])
  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min
  }
  const addQuestion = () => {
    let validate = false
    const numberRound = Math.round(getRandomArbitrary(0, 30))

    const questionsInd = data.questions[numberRound]

    arrayAddQuestion.map(item => {
      if (item.question === questionsInd.question) {
        validate = true
      }
    })
    if (validate === false) {
      questionsInd.response = ''
      questionsInd.id = numberRound
      arrayAddQuestion.push(data.questions[numberRound])
      setIndexQ(numberRound)
    }

  }
  const handleTextChange = (e) => {
    data.questions[e.target.id].response = e.target.value
  }

  const sendInfo = () => {
    let emptyValues = false
    arrayAddQuestion.map(item => {
      if (item.response === '') {
        emptyValues = true
      }
    })
    if (!emptyValues) {
      setLoading(true)
      return Request.postMethod({
        url: '/registerQuestions',
        body: arrayAddQuestion
      })
        .then(response => {
          setLoading(false)

          if (response.status === 200) {

          }
        })
        .catch(error => {
          setLoading(false)

          console.log(error)
        })
    } else {
      alert('Debe completar todos los campos')
    }
  }

  return (
    <Container maxWidth="sm">
      <Title>Generador de encuestas</Title>
      {loading && <CircularProgress />}
      {
        arrayAddQuestion.map((item, index) => {
          return (
            <ContainerElements key={index}>
              <QuestionItemElement>{item.question}</QuestionItemElement>
              <InputItemElement>
                <TextField required={true} onChange={(e) => handleTextChange(e)} inputProps={{ min: 0, style: { textAlign: 'left' } }}
                  id={item.id}
                />
              </InputItemElement>
            </ContainerElements>
          )
        })
      }
      <ContainerButtons>
        <div style={{ marginBottom: 20 }}>
          <Button onClick={sendInfo} variant="contained" color="secondary">
            enviar encuesta
          </Button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Button onClick={addQuestion} variant="contained" color="secondary">
            agregar pregunta
          </Button>
        </div>
      </ContainerButtons>
    </Container>
  )
}

export default App
