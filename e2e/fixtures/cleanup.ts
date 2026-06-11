import { deleteE2eUser, type E2eUser } from './testUsers'
import { deleteMultiplayerRowsForUsers } from './supabaseAdmin'

export interface CleanupSummary {
  readonly multiplayerRowsDeleted: number
  readonly usersDeleted: number
}

export async function cleanupE2eRun(users: readonly E2eUser[]): Promise<CleanupSummary> {
  const userIds = users.map((user) => user.id)
  const multiplayerRowsDeleted = await deleteMultiplayerRowsForUsers(userIds)
  let usersDeleted = 0
  for (const user of users) {
    await deleteE2eUser(user)
    usersDeleted += 1
  }
  return { multiplayerRowsDeleted, usersDeleted }
}
