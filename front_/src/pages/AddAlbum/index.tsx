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

  const [tracklist, setTracklist] = useState([{ number: 1, title: '', rating: 0 }])

  const addInput = () => {
    setTracklist(tracks => (
      [...tracks, {
        number: tracks.length + 1,
        title: '',
        rating: 0
      }]
    ))
  }

  const handleChange = ({ target }: any) => {
    const { type, id: index, value } = target

    setTracklist(tracks => {
      const newTracklist = [...tracks]
      const track: { [key: string]: any } = newTracklist[index]

      const input = type === 'text'
        ? { field: 'title', value }
        : {
          field: 'rating',
          // convert range value to number
          value: +value
        }

      track[input.field] = input.value

      return newTracklist
    })
  }

  const resetFields = () => {
    setAlbum({ title: '', release: '' })
    setTracklist([{ number: 1, title: '', rating: 0 }])
  }

  const addAlbum = (e: any) => {
    e.preventDefault()

    fetchData({ ...album, tracklist })
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
          <div key={i}>
            <Input
              type="track"
              placeholder={`Track ${i + 1}`}
              id={i.toString()}
              value={[item.title, item.rating]}
              onChange={handleChange}
              range={{ min: 0, max: 10, step: .5 }}
            />
          </div>
        ))}

        <div className="add-track-button" onClick={addInput}>
          <PlusSmallIcon width="1.5rem" strokeWidth={1} />
          <p>Add track</p>
        </div>

        <Button>Add album</Button>
      </form>
      <Button onClick={resetFields}>Reset</Button>
    </Container>
  )
}

export default AddAlbum