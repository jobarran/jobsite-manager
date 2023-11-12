# Next.js TesloShop App
Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

* El -d significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/jobsitemanagement
```

## Configurar las variables de entorno
Renombrar el archivo __.env-template__ a __.env__
*MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/jobsitemanagement
```

*Reconstruir los módulos de node y levantar next
```
yarn install
yarn dev
```

## Llenar la base de datos con informacion de prueba

Llamara:
```
http://localhost:3000/api/seed
```

## Edit code from other computer

*Recuperar codigo actualizado
```
git pull origin main
```

*Add, commit, pus
```
git add .
git commit -m "text"
git push origin HEAD:main