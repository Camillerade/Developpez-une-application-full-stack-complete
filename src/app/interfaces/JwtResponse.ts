export interface JwtResponse {
    token: string;
    // Ajoutez d'autres champs nécessaires pour la réponse JWT
    expiresIn: number;
    userId: string;
    username: string;
}