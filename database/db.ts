import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type NextFunction = (err?: Error) => void;


/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {

    if ( mongoConnection.isConnected ) {
        console.log('Already connected');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            console.log('Using previous connection');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect( process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Connecting to MongoDB:', process.env.MONGO_URL );
}

export const disconnect = async() => {
    
    //TODO:: Closing before process is done
    
    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    console.log('Disconnecting from MongoDB');
}

export const newConnect = async(req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {

    try {
        // Connect to MongoDB
        await mongoose.connect( process.env.MONGO_URL || '');
        mongoConnection.isConnected = 1;
        console.log('Connecting to MongoDB:', process.env.MONGO_URL );
    
        // Continue with the request handling
        next();
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } finally {
        // Disconnect from MongoDB after processing the request
        console.log('desconectado')
        await disconnect();
      }

    // await mongoose.connect( process.env.MONGO_URL || '');
    // mongoConnection.isConnected = 1;
    // console.log('Connecting to MongoDB:', process.env.MONGO_URL );
}