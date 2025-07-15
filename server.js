const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes.js');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');



mongoose.connect('mongodb+srv://mbahtochukwu75:08PeRqs64EuPLrpx@mbah.xxe48ev.mongodb.net/?retryWrites=true&w=majority&appName=MBAH')
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));




app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);


app.get('/', (req, res) => {
  res.send('Kingsmen Pastries Backend is running!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
