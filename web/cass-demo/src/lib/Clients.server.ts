import { Client as CassandraClient } from 'cassandra-driver';

export const cassClient = new CassandraClient({
    contactPoints: ['tutorial-cassandra-1:9042'],
    localDataCenter: 'tutorial-1',
    keyspace: 'shoe_keyspace'
});