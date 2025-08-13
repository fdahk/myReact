// app.ts
import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});