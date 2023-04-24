import './styles.scss'

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
      {albums?.map(({ id, title, rating, tracklist }: { id: string, title: string, release: string, rating: number, tracklist: [] }) => (
        <div className="album" key={id}>
          <div className="album-info">
            <h3 className="album-info-title">{title}</h3>
            <p className="album-info-rating">Rating: {rating}</p>
          </div>
          <ul className="album-tracklist">
            {tracklist.map(({ number, title }: { number: number, title: string }) => (
              <li className="track" key={number}>
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