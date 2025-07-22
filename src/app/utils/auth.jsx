import { users } from '@/users';

export function validateUser(username, password) {
  return users.find(u => u.username === username && u.password === password) || null;
}