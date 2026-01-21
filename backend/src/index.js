const express = require('express');
const cors = require('cors');
const telemetriaRouter = require('./controllers/TelemetriaController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/telemetria', telemetriaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`M.C.S. backend running on port ${PORT}`));
