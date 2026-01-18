// X:\ecommerce_Projects\BeToo_Frontend\src\components\FacebookPagePlugin.jsx

import React, { useEffect } from 'react';

function FacebookPagePlugin({ pageUrl = 'YOUR_FACEBOOK_PAGE_URL', appId = 'YOUR_APP_ID' }) {
    useEffect(() => {
        // Initialiser le SDK JavaScript de Facebook
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : appId, // Remplacez par votre ID d'application Facebook
                cookie     : true,
                xfbml      : true,
                version    : 'v19.0' // Utilisez la version la plus récente de l'API Graph
            });
        };

        // Charger le SDK Facebook de manière asynchrone
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/fr_FR/sdk.js"; // Ou 'en_US' si vous préférez l'anglais
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Nettoyage si le composant est démonté (optionnel, mais bonne pratique)
        return () => {
            // Pas de fonction de nettoyage directe pour FB SDK, mais on peut s'assurer que fbAsyncInit n'est pas appelé deux fois
            window.fbAsyncInit = null;
        };
    }, [appId]); // Dépendance à appId pour réinitialiser si l'ID change

    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h2 className="section-subtitle">Suivez-nous sur Facebook !</h2>
            {/* Le conteneur du plugin de page Facebook */}
            <div
                className="fb-page"
                data-href={pageUrl} // Remplacez par l'URL de votre page Facebook
                data-tabs="timeline" // Ou 'messages', 'events'
                data-width="400" // Largeur du plugin (ajustez selon votre design)
                data-height="300" // Hauteur du plugin (ajustez selon votre design)
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
                style={{ display: 'inline-block' }} // Pour centrer le plugin
            >
                <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
                    <a href={pageUrl}>BeToo Andria</a>
                </blockquote>
            </div>
            {/* Message si le plugin ne se charge pas */}
            <noscript>
                Veuillez activer JavaScript pour voir notre page Facebook.
                Vous pouvez aussi visiter notre page directement : <a href={pageUrl} target="_blank" rel="noopener noreferrer">{pageUrl}</a>
            </noscript>
        </div>
    );
}

export default FacebookPagePlugin;
