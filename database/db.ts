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

let cachedConnection:any = null;

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

    const connection =  await mongoose.connect( process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Connecting to MongoDB:', process.env.MONGO_URL );
    cachedConnection = connection;
    return connection;
}

export const closeDatabaseConnection = async() => {
    console.log(cachedConnection)
    if (cachedConnection) {
      await cachedConnection.connection.close();
      console.log('Mongoose connection closed');
    }
  }

export const disconnect = async() => {
    
    //TODO:: Closing before process is done
    
    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    console.log('Disconnecting from MongoDB');
}

export const closeConnection = async() => {
    console.log('Closing connection')
    await mongoose.connection.close()
}