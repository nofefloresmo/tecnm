#!/bin/bash

echo "Esperando a que MongoDB esté listo..."

until mongosh --host mongo01 --eval "print(\"conexion exitosa\")"; do
  sleep 5
done

echo "Inicializando el replicaset..."

mongosh --host mongo01 <<EOF
rs.initiate({
  _id: 'replica01',
  members: [
    { _id: 0, host: 'mongo01:27017' },
    { _id: 1, host: 'mongo02:27017' },
    { _id: 2, host: 'mongo03:27017' }
  ]
})
EOF

echo "Replicaset inicializado."

# Indica que el script ha terminado su trabajo y finaliza.
exit 0
