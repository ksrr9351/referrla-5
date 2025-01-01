import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rwareferral:Singh6249@monkey.1yuqg.mongodb.net/new';

async function connectToDatabase() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(MONGO_URI);
  }
}

export default connectToDatabase;
