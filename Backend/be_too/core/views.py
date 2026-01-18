from django.http import HttpResponse
import os

def index(request):
    """
    Serve le frontend React en dev via Vite.
    Si dist/ existe (build), Django servira les fichiers statiques.
    Sinon, on redirige vers Vite en dev.
    """
    # Chemin vers le build React
    dist_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "Frontend", "dist", "index.html")
    
    if os.path.exists(dist_path):
        with open(dist_path, encoding='utf-8') as f:
            return HttpResponse(f.read())
    else:
        # En dev, on redirige vers Vite
        return HttpResponse(
            '<!DOCTYPE html>'
            '<html><head><meta http-equiv="refresh" content="0;url=http://localhost:5173/"></head>'
            '<body>Redirection vers le frontend React...</body></html>'
        )
