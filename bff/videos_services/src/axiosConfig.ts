// Importe o Axios e outras dependências necessárias
import axios from 'axios';

// Crie uma instância do Axios com a URL base da API do YouTube
const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    headers: {
        'Content-Type': 'application/json',
        // Aqui você pode adicionar outros headers necessários, como chave de API, etc.
    },
    params: {
        part: 'snippet',  // Exemplo de parâmetro comum
        type: 'video',    // Exemplo de parâmetro comum
    },
});

export default axiosInstance;
