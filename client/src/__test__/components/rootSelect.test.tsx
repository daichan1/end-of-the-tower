import { screen } from "@testing-library/react"
import { render } from '../testProvider'
import RootSelect from '../../components/rootSelect'
import { rootSelectStore } from '../factories/rootSelect'

describe('root select component', () => {
  it('initial render', () => {
    const store = rootSelectStore()
    render(<RootSelect />, store)

    const img = screen.getByRole('img')
    const circles = screen.getAllByRole('button')
    const lines = screen.getAllByTestId('line')

    expect(img).toBeInTheDocument()
    expect(circles.length).toBe(6)
    expect(lines.length).toBe(5)
  })
})
