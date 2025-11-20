export const genders = [
  {
    value: "H",
    label: "Homme",
  },
  {
    value: "F",
    label: "Femme",
  },
];

export const roles = [
  {
    value: "Sage femme",
    label: "Sage femme",
  },
  {
    value: "Patient",
    label: "Patient",
  },
  {
    value: "Infirmière",
    label: "Infirmière",
  },
  {
    value: "Medecin",
    label: "Medecin",
  },
  {
    value: "Aide soignant",
    label: "Aide soignant",
  },
  {
    value: "Kinesitherapeute",
    label: "Kinesitherapeute",
  },
];

export const sageFemmeServices = [
  {
    _id: {
      $oid: "6612b03e43700ec05f4f8454",
    },
    serviceName: "Survaillance post-accouchement",
  },
  {
    _id: {
      $oid: "6612b15b43700ec05f4f845a",
    },
    serviceName: "Injection pour les bébé",
  },
  {
    _id: {
      $oid: "6612b14143700ec05f4f8458",
    },
    serviceName: "Suivi gynécologique hors grossesse",
  },
  {
    _id: {
      $oid: "6612b19f43700ec05f4f845e",
    },
    serviceName: "Injection pour la maman",
  },
  {
    _id: {
      $oid: "6612b08343700ec05f4f8456",
    },
    serviceName: "Pansement post tumorectomie au niveau du sein",
  },
  {
    _id: {
      $oid: "6612b17d43700ec05f4f845c",
    },
    serviceName: "Pansement post césarienne",
  },
  {
    _id: {
      $oid: "6612b27f43700ec05f4f8460",
    },
    serviceName: "Pansement post hysterectomie",
  },
  {
    _id: {
      $oid: "6612b2a243700ec05f4f8462",
    },
    serviceName: "Survaillance de la grossesse",
  },
];

export const kineServices = [
  {
    _id: {
      $oid: "6612b35743700ec05f4f846b",
    },
    serviceName: "Massage et rééducation antidouleur",
  },
  {
    _id: {
      $oid: "6612b2d643700ec05f4f8465",
    },
    serviceName: "Renforcement musculaire",
  },
  {
    _id: {
      $oid: "6612b3a643700ec05f4f8471",
    },
    serviceName: "Drainage lymphatique",
  },
  {
    _id: {
      $oid: "6612b36c43700ec05f4f846d",
    },
    serviceName: "Rééducation membre",
  },
  {
    _id: {
      $oid: "6612b37e43700ec05f4f846f",
    },
    serviceName: "Rééducation à la marche",
  },
  {
    _id: {
      $oid: "6612b33c43700ec05f4f8469",
    },
    serviceName: "Mobilisation membres et récupération",
  },
  {
    _id: {
      $oid: "6612b31443700ec05f4f8467",
    },
    serviceName: "Kinésithérapie respiratoire",
  },
];

export const infirmiereSercices = [
  {
    _id: {
      $oid: "6612b40a43700ec05f4f8477",
    },
    serviceName: "Pansement",
  },
  {
    _id: {
      $oid: "6612b44c43700ec05f4f847d",
    },
    serviceName: "Surveillance des constantes",
  },
  {
    _id: {
      $oid: "6612b3ee43700ec05f4f8474",
    },
    serviceName: "Injection",
  },
  {
    _id: {
      $oid: "6612b41743700ec05f4f8479",
    },
    serviceName: "Perfusion",
  },
  {
    _id: {
      $oid: "6612b46343700ec05f4f847f",
    },
    serviceName: "Soins de stomie",
  },
  {
    _id: {
      $oid: "6612b43243700ec05f4f847b",
    },
    serviceName: "Ablation points de sutures",
  },
  {
    _id: {
      $oid: "6612e84fe4e8eb57c74df1fd",
    },
    serviceName:
      "Soins et surveillance des patients en assistance nutritive ou parentérale",
    __v: 0,
  },
  {
    _id: {
      $oid: "6612e87ce4e8eb57c74df1ff",
    },
    serviceName: "Surveillance de l'élemination intestinale et urinaire",
    __v: 0,
  },
  {
    _id: {
      $oid: "6612e8afe4e8eb57c74df201",
    },
    serviceName:
      "Surveillance prise médicmenteuse conformément a l'ordonnace médical",
    __v: 0,
  },
  {
    _id: {
      $oid: "6612e8dee4e8eb57c74df203",
    },
    serviceName:
      "Aspiration des sécrétions d'un patient qu'il soit ou non trachéotomisé",
    __v: 0,
  },
  {
    _id: {
      $oid: "6612e8f4e4e8eb57c74df205",
    },
    serviceName: "Soins d'hygiène",
    __v: 0,
  },
];

export const aideSoignantServices = [
  {
    _id: {
      $oid: "6617ea31f484f4eb3b18400b",
    },
    serviceName: "Signe vitaux",
    __v: 0,
  },
  {
    _id: {
      $oid: "6617ea63f484f4eb3b18400d",
    },
    serviceName: "Hygiene",
    __v: 0,
  },
];

export const persoSanteValues = [
  {
    value: "Sage femme",
    label: "Sage femme",
    services: sageFemmeServices,
  },
  {
    value: "Infirmière",
    label: "Infirmière",
    services: infirmiereSercices,
  },
  {
    value: "Medecin",
    label: "Medecin",
    services: null,
  },
  {
    value: "Aide soignant",
    label: "Aide soignant",
    services: aideSoignantServices,
  },
  {
    value: "Kinesitherapeute",
    label: "Kinesitherapeute",
    services: kineServices,
  },
];

export const chatBulltes = [
  {
    full_name: 'Moe Ouni',
    last_message: 'Hello',
  },
  {
    full_name: 'Nidhal Boumaiza',
    last_message: 'Hello',
  },
  {
    full_name: 'John Doe',
    last_message: 'Hey there',
  }
]
