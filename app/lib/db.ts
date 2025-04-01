import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

interface GlobalMongoose {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: GlobalMongoose | undefined;
}

const cached: GlobalMongoose = global.mongoose ?? { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    console.log('MongoDB bağlantısı zaten mevcut');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('MongoDB bağlantısı başlatılıyor...');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('MongoDB bağlantısı başarılı!');
      return mongoose.connection;
    }).catch((error) => {
      console.error('MongoDB bağlantı hatası:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    global.mongoose = cached;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default connectDB; 