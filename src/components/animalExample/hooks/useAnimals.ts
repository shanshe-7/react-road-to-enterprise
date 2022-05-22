import { ERROR, PENDING, IDLE, SUCCESS } from '@/constants/api/apiStatuses'
import { fetchDog, fetchCat } from '@/api/animalsApi'
import { useEffect, useState } from 'react'
import { withAsync } from '@/helpers/withAsync/withAsync'
import { useApiStatus } from '@/hooks/useApiStatuses'

export function useFetchAnimals() {
  const [dog, setDog] = useState<string>()
  const [cat, setCat] = useState<string>()
  const {
    status: fetchAnimalStatus,
    setStatus: setFetchAnimalStatus,
    isIdle: isFetchAnimalStatusIdle,
    isPending: isFetchAnimalStatusPending,
    isSuccess: isFetchAnimalStatusSuccess,
    isError: isFetchAnimalStatusError,
  } = useApiStatus(IDLE)

  async function getDog() {
    const { data } = await fetchDog()
    setDog(data.message)
  }

  async function getCat() {
    const { data } = await fetchCat()
    setCat(data?.[0].url)
  }

  async function getAnimalsRequest() {
    return Promise.all([getDog(), getCat()])
  }

  async function getAnimals() {
    setFetchAnimalStatus(PENDING)
    const response = await withAsync(getAnimalsRequest)

    setFetchAnimalStatus(response ? SUCCESS : ERROR)
  }

  useEffect(() => {
    getAnimals()
  }, [])

  return {
    dog,
    cat,
    fetchAnimalStatus,
    getAnimals,
    isFetchAnimalStatusIdle,
    isFetchAnimalStatusPending,
    isFetchAnimalStatusSuccess,
    isFetchAnimalStatusError,
  }
}
