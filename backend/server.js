const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', appointmentRoutes);

app.post('/api/llama2', async (req, res) => {
  try {
    const { message, request, temperature, maxTokens, topP, repetitionPenalty } = req.body;
    const { Client } = await import('@gradio/client'); // Importação dinâmica
    const client = await Client.connect("ysharma/Explore_llamav2_with_TGI");
    const result = await client.predict("/chat", { 
      message, 
      request, 
      param_3: temperature, 
      param_4: maxTokens, 
      param_5: topP, 
      param_6: repetitionPenalty 
    });
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});