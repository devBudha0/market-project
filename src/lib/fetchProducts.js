import { supabase } from '@/utils/supabase/client'

export async function fetchProducts() {
  const { data: products, error } = await supabase.from('products').select()

  if (error) {
    throw new Error(error.message)
  }
  return products
}
