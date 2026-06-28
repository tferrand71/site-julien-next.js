import { cookies } from 'next/headers';

/**
 * Vérifie que l'utilisateur est authentifié en tant qu'admin.
 * Lance une erreur si le cookie de session est absent ou invalide.
 * À appeler au début de chaque Server Action de mutation.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;

  if (!session || session !== process.env.ADMIN_SECRET) {
    throw new Error('Unauthorized: Admin authentication required');
  }
}
