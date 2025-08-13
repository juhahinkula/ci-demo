import express from 'express';
import Calculator from './calculator';

const app = express();
app.use(express.json());

const calculator = new Calculator();

app.get('/', (req, res) => {
  res.json({ message: 'Calculator API is running' });
});

/*
* Endpoint to perform calculations
* body: {
*   operation: 'add' | 'subtract' | 'multiply' | 'divide',
*   a: number,
*   b: number
* } 
*/
app.post('/calculate', (req, res) => {
  try {
    const { operation, a, b } = req.body;
    let result: number;

    switch (operation) {
      case 'add':
        result = calculator.add(a, b);
        break;
      case 'subtract':
        result = calculator.subtract(a, b);
        break;
      case 'multiply':
        result = calculator.multiply(a, b);
        break;
      case 'divide':
        result = calculator.divide(a, b);
        break;
      default:
        res.status(400).json({ error: 'Invalid operation' });
        return;
    }

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 3000

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;