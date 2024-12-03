import Fastify from 'fastify'
import Database from 'better-sqlite3';


const fastify = Fastify({
  logger: true
})

fastify.register(import('fastify-bcrypt'), {
    saltWorkFactor: 12
})
fastify.register(import('@fastify/cors'), { 
    origin: '*', //'http://localhost:8080' // Allow requests from this origin
  });

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
fastify.post('/api/addPlayer', async (request, reply) => {
    const { name, password, record, lastGame } = request.body;

    if (!name || !password) {
        return reply.status(400).send({ success: false, error: 'Invalid input data' });
    }
  

    const passHash = await fastify.bcrypt.hash(password)
    
    try {
        const prepareRequest = db.prepare(`
            INSERT INTO players (name, password, record, lastGame)
            VALUES (?, ?, ?, ?)
        `);
        prepareRequest.run(name, passHash, record, lastGame);
        reply.send({ data: { name, record, lastGame }, success: true, message: 'Player added successfully' });
    } catch (err) {
    reply.status(500).send({ success: false, message: err.message });
    }
});

//get player
fastify.post('/api/getPlayer', async (request, reply) => {
    const { name, password } = request.body;

    try {
        const player = db.prepare(`SELECT * FROM players WHERE name = ?`).get(name);

        if(!player){
            return reply.status(404).send({success: false, message: 'Player not found'})
        }

        const isMatch = await fastify.bcrypt.compare(password, player.password);

        if (isMatch) {
            reply.send({data: player, success: true});
        } else {
            reply.status(404).send({ success: false, message: 'Incorrect password' });
        }
    } catch (err) {
        reply.status(500).send({ success: false, message: err.message });
    }
});

// delete a player by name
fastify.delete('/api/deletePlayer', async (request, reply) => {
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
fastify.get('/api/allPlayers', async (request, reply) => {
    try {
        const players = db.prepare(`SELECT * FROM players`).all();
        if(!players){
            throw new Error('Oops ...')
        }
        reply.send({data:players, success: true});
    } catch (err) {
    reply.status(500).send({ success: false, message: err.message });
    }
});

fastify.get('/api/bestPlayers', async (request, reply) => {
    try {
        const players = db.prepare(`SELECT name, record FROM players`).all();
        if(!players){
            throw new Error('Oops ...')
        }
        const best5Players = players.sort((a,b) => b.record - a.record).slice(0,5)
        reply.send({data:best5Players, success: true});
    } catch (err) {
    reply.status(500).send({ success: false, message: err.message });
    }
});

// update player
fastify.put('/api/updatePlayer', async (request, reply) => {
    try {
        const { name, record, lastGame } = request.body;
    
        if (!name || typeof record === 'undefined' || !lastGame) {
          return reply.status(400).send({ success: false, error: 'Invalid input data' });
        }
    
        // Prepare and run the update statement
        const stmt = db.prepare(`
          UPDATE players
          SET record = ?, lastGame = ?
          WHERE name = ?
        `);
        const result = stmt.run(record, lastGame, name);
    
        if (result.changes === 0) {
          return reply.status(404).send({ success: false, error: 'Player not found' });
        }
    
        return reply.send({ data: {record, lastGame, name}, success: true, message: 'Player updated successfully' });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: 'Internal Server Error' });
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