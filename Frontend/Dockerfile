FROM node:20-slim

WORKDIR /app

# Copier uniquement les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port par défaut de Vite
EXPOSE 5173

# Lancer Vite avec l'hôte 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
