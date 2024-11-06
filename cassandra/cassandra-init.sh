#!/usr/bin/env bash

function wait_cass {
    until printf "" >>/dev/tcp/cassandra-$1/9042; do 
        sleep 10;
        echo "Waiting for cassandra-$1...";
    done
}

wait_cass 1 & wait_cass 2 & wait_cass 3

wait

echo "Creating keyspace & tables if necessary..."
cqlsh cassandra-1 -u cassandra-1 -p cassandra-1 -f /cassandra-setup.cql

echo "All keyspaces have been created!"
