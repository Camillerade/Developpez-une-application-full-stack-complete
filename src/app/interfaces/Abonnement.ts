// src/app/interfaces/abonnement.interface.ts
export interface Abonnement {
    idUsers: number;
    idTheme: number;
    theme: {
      id: number;
      title: string;
      description: string;
    };
  }
  