export const USER_PROFILE = {
  DIRECTOR: "Direção/Coordenação",
  TEACHER: "Professor",
};

export type UserProfile = keyof typeof USER_PROFILE;

export const PROFILE_SELECT: {
  value: UserProfile;
  label: string;
}[] = [
    { value: "DIRECTOR", label: "Direção/Coordenação" },
    { value: "TEACHER", label: "Professor" },
  ];

export const USER_STATUS = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
};

export type UserStatus = keyof typeof USER_STATUS;

export const STATUS_SELECT: {
  value: UserStatus;
  label: string;
}[] = [
    { value: "ACTIVE", label: "Ativo" },
    { value: "INACTIVE", label: "Inativo" },
  ];

export const paginationOptions = [
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
];

export const monthsAbbreviation = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
]
