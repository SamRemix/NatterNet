import './styles.scss'

// dependencies
import { useState } from 'react'

// components
import Container from '../../components/Container'
import Button from '../../components/Button'
import Input from '../../components/Input'

// hooks
import useFetch from '../../hooks/useFetch'
import useInputValue from '../../hooks/useInputValue'
import { PlusSmallIcon } from '@heroicons/react/24/outline'

const AddAlbum = () => {
  const [album, setAlbum] = useState({ title: '', release: '' })

  const { setState } = useInputValue(setAlbum)

  const { fetchData } = useFetch({
    method: 'post',
    url: '/albums',
    requireAuth: true
  })

  const [tracklist, setTracklist] = useState([{ number: 1, title: '' }])

  const addInput = () => {
    setTracklist(tracks => (
      [...tracks, { number: tracks.length + 1, title: '' }]
    ))
  }

  const handleChange = ({ target }: any) => {
    const { id, value } = target

    setTracklist(tracks => {
      const newTracklist = tracks.slice()
      newTracklist[id].title = value

      return newTracklist
    })

    console.log(tracklist)
  }

  const addAlbum = (e: any) => {
    e.preventDefault()

    fetchData({ ...album, tracklist })

    // reset fields
    setAlbum({ title: '', release: '' })
    setTracklist([{ number: 1, title: '' }])
  }

  return (
    <Container title="Add album">
      <form className="form" onSubmit={addAlbum}>
        <Input
          placeholder="Title"
          value={album.title}
          name="title"
          onChange={setState}
        />

        <Input
          type="date"
          placeholder="Release date"
          value={album.release}
          name="release"
          onChange={setState}
        />

        {tracklist.map((item, i) => (
          <Input
            placeholder={`track ${i + 1}`}
            id={i.toString()}
            value={item.title}
            onChange={handleChange}
            autoFocus={true}
            key={i}
          />
        ))}

        <div className="add-track-button" onClick={addInput}>
          <PlusSmallIcon width="1.5rem" strokeWidth={1} />
          <p>Add track</p>
        </div>

        <Button>Add album</Button>
      </form>
    </Container>
  )
}

export default AddAlbum