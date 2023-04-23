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
      {albums?.map(({ title, release, tracklist }: { title: string, release: string, tracklist: [] }) => (
        <div className="album">
          <h3 className="album-title">{title}</h3>
          <p>released {release}</p>
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