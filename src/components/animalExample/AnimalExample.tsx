import { useFetchAnimals } from './hooks/useAnimals'

const AnimalExample = () => {
  const {
    dog,
    cat,
    fetchAnimalStatus,
    getAnimals,
    isFetchAnimalStatusIdle,
    isFetchAnimalStatusPending,
    isFetchAnimalStatusSuccess,
    isFetchAnimalStatusError,
  } = useFetchAnimals()

  console.log(fetchAnimalStatus)

  return (
    <div>
      <h1>Animal Example</h1>
      <div className='flex justify-center items-center mt-4 border-red-200 h-52'>
        {isFetchAnimalStatusIdle ? <p>Welcome</p> : null}{' '}
        {isFetchAnimalStatusPending ? <p>Loading data...</p> : null}{' '}
        {isFetchAnimalStatusError ? <p>There was a problem</p> : null}{' '}
        {isFetchAnimalStatusSuccess ? (
          <>
            <img className='h-36 w-40' src={dog} alt='dog' />
            <img className='h-36 w-40' src={cat} alt='cat' />
          </>
        ) : null}
      </div>
      <button className='border-2 bg-cyan-100 mt-4 p-3' onClick={getAnimals}>
        get Animals
      </button>
    </div>
  )
}

export default AnimalExample
