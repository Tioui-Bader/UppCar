// ─────────────────────────────────────────────────────────────
//  fr.js  —  French translations for UppCar Landing Page
//  Completely isolated from the main component.
//  Import: import { FR } from "./fr";
// ─────────────────────────────────────────────────────────────

export const FR = {
    // ── NAV ──
    nav: {
        vehicles: "Mon Profil",
        services: "Mes Réservations",
        pricing: "Favoris",
        aboutUs: "À propos",
        signIn: "Se connecter",
        myProfile: "Mon profil",
        myReservations: "Mes réservations",
        favorites: "Favoris",
        logout: "Déconnexion",
    },

    // ── LANG MENU ──
    lang: {
        arabic: "العربية",
        french: "Français",
        english: "English",
    },

    // ── HERO ──
    hero: {
        liveBadge: "Plus de 500 véhicules disponibles maintenant",
        taglineBadge: "Traitez 50 réservations automatiquement en un clic",
        h1Desktop: <>Le véhicule que vous voulez<br />Au moment où vous en avez besoin</>,
        h1Mobile: <>Le véhicule que vous voulez<br />Prêt à démarrer</>,
        phrases: [
            "Des réservations plus intelligentes.",
            "L'intelligence locative tout-en-un.",
            "Moteur de la mobilité moderne.",
            "De la réservation vers la croissance.",
        ],
        subtitle:
            "La plateforme ultime pour les conducteurs modernes et les agences. Réservations fluides et gestion puissante.",
        searchPlaceholder: "Décrivez votre voiture…",
        aiPhrases: [
            "Voiture de sport au coucher du soleil",
            "SUV élégant dans une forêt brumeuse",
            "Berline noire sous la pluie de Paris",
            "Cabriolet blanc au bord de la mer",
            "Jeep rouge sur des dunes de sable",
        ],
        searchBtn: "Rechercher",
        startFree: "Commencer gratuitement",
        browseFleet: "Parcourir la flotte",
        number1: "La plateforme n°1 au Maroc",
        pills: [
            "Sans caution",
            "Livraison sans contact",
            "Entièrement assuré",
            "+150 agences",
        ],
        feature1: "Aucun dépôt requis",
        feature1Mobile: "Sans caution",
        feature2: "Livraison sans contact",
        feature2Mobile: "Sans contact",
        feature3: "Entièrement assuré",
        feature4: "+150 Agences",
        feature4Mobile: "+150 Agences",
    },

    // ── MARQUEE ──
    marquee: {
        trusted: "Approuvé par les plus grands constructeurs mondiaux",
    },

    // ── PARTNERSHIP SECTION ──
    partnership: {
        badge: "Partenariat",
        titleLeft: "Un modèle basé sur ",
        titleHighlight: "la croissance de l'agence",
        subtitle:
            "Rejoignez UppCar et transformez votre activité avec notre modèle de partenariat hybride. Nous prouvons notre valeur d'abord.",
        cards: [
            {
                title: "Accès Agence",
                price: "100% Gratuit",
                desc: "Accès complet au tableau de bord SaaS, gestion de flotte et analyses — sans engagement initial.",
                badge: "Commencer ici",
            },
            {
                title: "Outils de gestion",
                price: "Inclus",
                desc: "Profitez d'un espace de travail numérique puissant pour gérer les opérations de votre agence, vos véhicules et vos réservations.",
            },
            {
                title: "Commission Marketplace",
                price: "10% par réservation",
                desc: "Nous ne gagnons que lorsque vous gagnez. Une commission fixe s'applique à chaque réservation confirmée via la plateforme.",
            },
        ],
    },

    // ── AGENCY OS SECTION ──
    agencyOS: {
        badge: "Agency OS",
        title: "Accélérez vos ",
        titleHighlight: "opérations.",
        subtitle:
            "Un seul centre de commande. Chaque réservation, véhicule et flux de revenus — parfaitement synchronisés.",
        features: [
            {
                title: "Gestion de flotte",
                tagline: "Suivi en temps réel du garage, spécifications en direct et disponibilité.",
                label: "Flotte",
            },
            {
                title: "CRM",
                tagline: "Historique client, programmes VIP et outils de fidélisation.",
                label: "CRM",
            },
            {
                title: "Réservations intelligentes",
                tagline: "Acceptez ou refusez instantanément. Fini la gestion sur Excel.",
                label: "Réservations",
            },
            {
                title: "Analyses de performance",
                tagline: "Algorithmes de tarification dynamique et prévisions de revenus.",
                label: "Analyses",
            },
        ],
        getStartedBtn: "Commencer maintenant",
        watchDemoBtn: "Voir la démo",
        stats: [
            { val: "4.2s", label: "Temps moyen de réservation" },
            { val: "99.9%", label: "Disponibilité de la plateforme" },
            { val: "38%", label: "Croissance des revenus" },
            { val: "+1200", label: "Agences partenaires" },
        ],
    },

    // ── MOCKUPS ──
    mockups: {
        fleet: {
            title: "État de la flotte en direct",
            subtitle: "Suivi GPS · 4 Véhicules",
            live: "EN DIRECT",
            cars: [
                { n: "Mercedes G-Class", st: "En trajet", d: "140 km/h" },
                { n: "Porsche 911 GT3", st: "Disponible", d: "Garage A" },
                { n: "Range Rover SV", st: "En service", d: "À l'atelier" },
                { n: "Ferrari SF90", st: "Réservé", d: "22 Mars" },
            ],
        },
        crm: {
            stats: [
                { label: "Total VIP", val: "1,248" },
                { label: "Taux de rétention", val: "94%" },
            ],
            clients: [
                { initials: "AR", name: "Alexander R.", tier: "Platine", rentals: 12, spend: "$18,400" },
                { initials: "SL", name: "Sophie L.", tier: "Or", rentals: 7, spend: "$9,200" },
                { initials: "MK", name: "Marcus K.", tier: "Argent", rentals: 3, spend: "$3,100" },
            ],
        },
        reservations: {
            newRequest: "Nouvelle demande",
            ref: "Réf #8922A",
            title: "Demande de réservation",
            car: "Audi RS6 Avant · 20–24 Mars",
            client: "Client",
            identity: "Identité",
            verified: "✓ Vérifié",
            total: "Valeur totale",
            accept: "Accepter la réservation",
            decline: "Refuser",
            confirmed: "✓ Réservation confirmée !",
            declined: "✕ Réservation refusée",
        },
        analytics: {
            label: "Revenus projetés · Mars",
            value: "$142K",
            growth: "↑ +24% comparé au mois dernier",
            avg: "Moyenne quotidienne : $4,580",
            days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
            stats: [
                { l: "Réservations", v: "38" },
                { l: "Utilisation", v: "87%" },
                { l: "Durée moyenne", v: "3.2 jours" },
            ],
        },
    },

    // ── ECOSYSTEM ──
    ecosystem: {
        badge: "L'écosystème",
        titleLeft: "L'écosystème unifié d'",
        titleHighlight: "UppCar",
        subtitle:
            "Une plateforme singulière reliant les conducteurs à la recherche de leur trajet parfait et les agences en quête d'une croissance inégalée.",
        cards: [
            {
                title: "Marketplace pour Conducteurs",
                desc: "Arrêtez de chercher sans fin. Comparez la disponibilité en temps réel, filtrez par spécifications et réservez instantanément. Pas de paperasse, juste la route.",
            },
            {
                title: "Centre de commande Agences",
                desc: "Obtenez un espace de travail SaaS de bout en bout. Gérez votre flotte, suivez les réservations en temps réel et analysez vos performances métier automatiquement.",
            },
            {
                title: "Croissance basée sur les données",
                desc: "Exploitez les analyses à la volée pour comprendre vos véhicules les plus performants, suivre les revenus mensuels et anticiper la demande.",
            },
        ],
        explore: "Explorer",
        comparison: {
            clients: {
                title: "Pourquoi les Clients aiment UppCar",
                items: [
                    { title: "Zéro friction", desc: "Comparez plusieurs agences dans une seule interface magnifique." },
                    { title: "Transparence absolue", desc: "Ce que vous voyez est ce que vous payez. Pas de surprises au comptoir." },
                    { title: "Contrôle en déplacement", desc: "Consultez vos trajets, modifiez votre profil et gérez vos réservations en toute fluidité." },
                ],
            },
            agencies: {
                title: "Pourquoi les Agences choisissent notre Plateforme",
                items: [
                    { title: "Opérations unifiées", desc: "Oubliez le suivi manuel. Véhicules, réservations et clients centralisés." },
                    { title: "Visibilité massive", desc: "Accédez à des milliers de clients vérifiés prêts à réserver." },
                    { title: "Analyses de pointe", desc: "Finies les suppositions. Connaissez les performances et la demande de votre ville." },
                ],
            },
        },
    },

    // ── CTA ──
    cta: {
        badge: "Commencer aujourd'hui",
        h2Line1: "La route est à vous",
        h2Line2: "Prêt à réserver ?",
        subtitle:
            "Que vous réserviez pour votre prochaine escapade du week-end ou que vous fassiez évoluer votre entreprise, UppCar a tout ce qu'il vous faut.",
        primaryBtn: "Mes Réservations",
        secondaryBtn: "Explorer la flotte",
        pills: ["Aucun dépôt requis", "Annulation gratuite", "Assuré dès le 1er jour"],
    },

    // ── FOOTER ──
    footer: {
        hqBadge: "Siège mondial",
        tagline:
            "Redéfinir la mobilité pour l'ère moderne. Des expériences de location de voitures premium, fluides et entièrement numériques à travers le monde.",
        columns: [
            {
                title: "Plateforme",
                links: ["Fonctionnalités de l'app", "Tarifs & Forfaits", "Emplacements mondiaux", "Notre flotte"],
            },
            {
                title: "Entreprise",
                links: ["À propos de nous", "Carrières", "Presse & Média", "Durabilité"],
            },
            {
                title: "Ressources",
                links: ["Centre d'aide", "Support client", "Documentation API", "État du système"],
            },
        ],
        operational: "les systèmes opérationnels",
        rights: "Tous droits réservés.",
        legalLinks: ["Politique de confidentialité", "Conditions de service", "Paramètres des cookies"],
    },

    // ── DROPDOWN: VEHICLES ──
    vehiclesDropdown: {
        browseBy: "Parcourir par Catégorie",
        featured: "Édition Spéciale",
        featuredTitle: "UppCar-Utopia",
        featuredDesc:
            "De 0 à 100 km/h en 3,2s. Le summum de l'ingénierie et du design modernes.",
        reserveNow: "Réserver",
        categories: [
            { name: "Voitures de sport", desc: "Performance & Frisson" },
            { name: "Berlines de luxe", desc: "Élégance & Confort" },
            { name: "SUV Premium", desc: "Espace & Puissance" },
            { name: "Modèles électriques", desc: "Zéro émission" },
        ],
    },

    // ── DROPDOWN: SERVICES ──
    servicesDropdown: [
        {
            title: "Service Chauffeur",
            desc: "Chauffeurs professionnels pour vos déplacements professionnels et occasions spéciales.",
            badge: "Bientôt dispo",
        },
        {
            title: "Réservations de voitures",
            desc: "Réservez le véhicule idéal instantanément avec confirmation immédiate.",
        },
        {
            title: "Espace de travail Agence",
            desc: "Gérez votre flotte, vos réservations et votre activité depuis un tableau de bord complet.",
        },
    ],

    // ── DROPDOWN: PRICING ──
    pricingDropdown: [
        {
            tier: "Payez à l'usage",
            price: "Agence Limitée",
            desc: "Aucun frais mensuel. Parfait pour la location occasionnelle le week-end.",
            btn: "S'inscrire gratuitement",
        },
        {
            tier: "Marketplace",
            price: "10% frais",
            desc: "Commission de 10% déduite de chaque réservation réussie.",
            btn: "Commencer maintenant",
            highlight: true,
            popular: "Le plus populaire",
        },
        {
            tier: "Flotte d'entreprise",
            price: "Personnalisé",
            desc: "Gestionnaire de compte dédié et facturation consolidée.",
            btn: "Contacter les ventes",
        },
    ],

    // ── LOGIN MENU ──
    loginMenu: {
        client: { label: "Client", desc: "Louer un véhicule" },
        agency: { label: "Agence de location", desc: "Gérer ma flotte", badge: "Pro" },
    },

    // ── FEATURE PILLS ──
    featurePills: [
        { l: "Sans caution", short: "Sans caution" },
        { l: "Livraison sans contact", short: "Sans contact" },
        { l: "Entièrement assuré", short: "Assuré" },
        { l: "+150 Agences", short: "+150 Agences" },
    ],
};
