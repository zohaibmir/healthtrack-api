import app from './app';
import { environment } from './config/environment';

const PORT = environment.port;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
