import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://srijan:amansrijan@cluster0.sspcw.mongodb.net/bloodbankmanagement?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 15000, // Increase timeout
  socketTimeoutMS: 15000,
  monitorCommands: true // Enable detailed command monitoring
});

async function run() {
  try {
    console.log('Trying to connect to MongoDB...');
    await client.connect();
    
    // Ping the database
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to MongoDB!');

    // Keep the connection open for testing without closing it immediately
  } catch (err) {
    console.error('Connection failed with error:');
    console.dir(err, { depth: null }); // Provides detailed error output
  }
}

run();
export default run;
