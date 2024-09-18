import Fastify from 'fastify'
import Database from 'better-sqlite3';


const fastify = Fastify({
  logger: true
})

fastify.register(import('fastify-bcrypt'), {
    saltWorkFactor: 12
})

const db = new Database('tetrisPlayers.db');


db.prepare(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      password TEXT,
      record INTEGER,
      lastGame TEXT
    )
  `).run();


// add a new player
fastify.post('/addPlayer', async (request, reply) => {
    const { name, password, record, lastGame } = request.body;

    const passHash = await fastify.bcrypt.hash(password)
    
    try {
        const prepareRequest = db.prepare(`
            INSERT INTO players (name, password, record, lastGame)
            VALUES (?, ?, ?, ?)
        `);
        prepareRequest.run(name, passHash, record, lastGame);
        reply.send({ data: { name, password, record, lastGame }, success: true, message: 'Player added successfully' });
    } catch (err) {
    reply.status(500).send({ success: false, message: err.message });
    }
});

//get player
fastify.post('/getPlayer', async (request, reply) => {
    const { name, password } = request.body;

    try {
        const player = db.prepare(`SELECT * FROM players WHERE name = ?`).get(name);

        if(!player){
            return reply.status(404).send({success: false, message: 'Player not found'})
        }

        const isMatch = await fastify.bcrypt.compare(password, player.password);

        if (isMatch) {
            reply.send(player);
        } else {
            reply.status(404).send({ success: false, message: 'Incorrect password' });
        }
    } catch (err) {
        reply.status(500).send({ success: false, message: err.message });
    }
});

// delete a player by name
fastify.delete('/deletePlayer', async (request, reply) => {
    const { name } = request.body;

    try {
        const result = db.prepare(`DELETE FROM players WHERE name = ?`).run(name);

        if (result.changes > 0) {
            reply.send({ success: true, message: `Player '${name}' deleted successfully` });
        } else {
            reply.status(404).send({ success: false, message: 'Player not found' });
        }
    } catch (err) {
        reply.status(500).send({ success: false, message: err.message });
    }
});

// get all players
fastify.get('/allPlayers', async (request, reply) => {
    try {
        const players = db.prepare(`SELECT * FROM players`).all();
        if(!players){
            throw new Error('Oops ...')
        }
        reply.send(players);
    } catch (err) {
    reply.status(500).send({ success: false, message: err.message });
    }
});


// Start the server
const start = async () => {
    try {
      await fastify.listen({ port: 3000 });
      fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
};
start();