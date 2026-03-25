// src/types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * On étend le type de la session pour y inclure notre 'id'
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  /**
   * On étend aussi le type User pour correspondre
   */
  interface User {
    id: string;
  }
}