import { createClient } from '@supabase/supabase-js'

export default class Database {
  static instance = null

  constructor() {
    if (Database.instance) {
      return Database.instance
    }

    this.supabase = createClient(
      process.env.DATABASE_URL,
      process.env.DATABASE_KEY
    )

    Database.instance = this
  }
}
