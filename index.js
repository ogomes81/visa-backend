import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import OpenAI from 'openai'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: '*' }))
app.use(express.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.post('/chat', async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid message format' })
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // change to gpt-4 if you have access
      messages: messages
    })

    res.json({ response: response.choices[0].message.content })
  } catch (err) {
    console.error('OpenAI Error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/', (req, res) => {
  res.send('Visa Assistant Chatbot backend is running.')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
