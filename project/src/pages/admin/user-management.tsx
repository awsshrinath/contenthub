import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
import { assignTokens, getTestUsers } from '@/services/admin';
import type { User } from '@/types/admin';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const testUsers = await getTestUsers();
      setUsers(testUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTokens = async (userId: string, tokens: number) => {
    try {
      await assignTokens(userId, tokens);
      await loadUsers(); // Refresh the list
    } catch (error) {
      console.error('Failed to assign tokens:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">User Management</h2>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Tokens: {user.tokens || 0}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleAssignTokens(user.id, (user.tokens || 0) + 5)}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Add 5 Tokens
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}