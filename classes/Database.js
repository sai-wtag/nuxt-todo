import { createClient } from '@supabase/supabase-js'

export default class Database {
  static instance = null

  constructor() {
    if (Database.instance) {
      return Database.instance
    }

    this.supabase = createClient(
      'https://zhsepptcavyowohakieh.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoc2VwcHRjYXZ5b3dvaGFraWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0OTE3NzEsImV4cCI6MTk5MTA2Nzc3MX0.SxdLsTGvb6mtyTtqf7zpBkt7IxAVuHvl3r7b3DGVLH8'
    )

    Database.instance = this
  }
}
