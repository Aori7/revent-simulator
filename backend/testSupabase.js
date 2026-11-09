const supabase = require('./supabaseClient');

async function testConnection() {
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    console.log('Error:', error.message);
  } else {
    console.log('Query successful:', data);
  }
}

testConnection();