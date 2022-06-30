import { screen } from "@testing-library/react"
import { render } from '../../testProvider'
import Cemetery from '../../../components/battle/cemetery'
import { cemeteryStore } from '../../factories/battle/cemetery'

describe("deck component", () => {
  it("initial render", () => {
    const store = cemeteryStore()
    render(<Cemetery />, store)

    const cemeteryCount = screen.getByTestId('cemeteryCount')

    expect(cemeteryCount.textContent).toBe("2")
  })
})
