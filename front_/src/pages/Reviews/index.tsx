// components
import Container from '../../components/Container'

// hooks
import useFetch from '../../hooks/useFetch'

const Reviews = () => {
  const { response: albums } = useFetch({
    method: 'get',
    url: '/albums'
  })

  return (
    <Container title="Reviews">
      {albums?.map(({ id, title, release, rating, tracklist }: { id: string, title: string, release: string, rating: number, tracklist: [] }) => (
        <div className="album" key={id}>
          <h3 className="album-title">{title}</h3>
          <p>released {release}</p>
          <p>Rating: {rating}</p>
          <ul className="album-tracklist">
            {tracklist.map(({ number, title }: { number: number, title: string }) => (
              <li key={number}>
                <p>{number}</p>
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  )
}

export default Reviews