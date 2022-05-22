import { fetchCat } from '@/api/animalsApi'
import { useEffect, useState } from 'react'

export function useFetchCat() {
  const [cat, setCat] = useState<string>()

  async function getCat() {
    const { data } = await fetchCat()
    setCat(data?.[0].url)
  }

  useEffect(() => {
    getCat()
  }, [])

  return { cat }
}
