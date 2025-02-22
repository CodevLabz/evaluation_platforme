import mongoose from 'mongoose';



async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect('mongodb+srv://Amine:amineTest!1@forumcluster.1kzvt.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB; 