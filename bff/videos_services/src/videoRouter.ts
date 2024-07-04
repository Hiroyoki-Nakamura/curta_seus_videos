import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const searchTerm = req.query.q as string;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        part: 'snippet',
        type: 'video',
        q: searchTerm
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', (error as Error).message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Detalhes do erro:', error.response.data);
    }
    res.status(500).json({ error: 'Erro ao buscar vídeos' });
  }
});

export default router;
