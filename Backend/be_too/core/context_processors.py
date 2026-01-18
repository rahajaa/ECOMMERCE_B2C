def global_context(request):
    """
    Ajoute des variables globales à tous les templates
    """
    from django.conf import settings
    
    return {
        'SITE_NAME': 'core.settings.py',
        'DEBUG': settings.DEBUG,
        # Ajoutez d'autres variables globales ici
    }