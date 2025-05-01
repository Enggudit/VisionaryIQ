import mongoose from 'mongoose'

export const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Connected to MongoDB')
      mongoose.connection.on('disconnected', () => {
        console.error('MongoDB disconnected! Retrying...');
        connectToDatabase();
      });
      
    } catch (error) {
      console.error('MongoDB connection error:', error)
      process.exit(1) // Exit if connection fails
    }
  }
 