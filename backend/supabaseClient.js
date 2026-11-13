const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

module.exports = supabase;