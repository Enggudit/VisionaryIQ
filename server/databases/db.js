import mongoose from 'mongoose'
import dns from 'dns';

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

export const connectToDatabase = async () => {
    try {
      console.log("adasd",process.env.MONGODB_URI)
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
 