# 1. Utiliser une image Python légère
FROM python:3.11-slim

# 2. Définir le dossier de travail dans le container
WORKDIR /app

# 3. Empêcher Python de générer des fichiers .pyc et forcer l'affichage des logs
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 4. Installer les dépendances système nécessaires pour PostgreSQL (psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 5. Installer les dépendances Python
# On suppose que tu as un fichier requirements.txt
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copier le reste du projet
COPY . /app/
