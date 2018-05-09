import PromptsIndexContainer from '../../../app/javascript/react/containers/PromptsIndexContainer'
import PromptsTile from '../../../app/javascript/react/components/PromptsTile'

import fetchMock from 'fetch-mock'
import { shallow } from 'enzyme'

describe('PromptsIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    let prompts = [
      {description: "This is test prompt 1, written by user_1, to be answered with a test response.", user: 1},
      {description: "This is test prompt 2, written by user_1, to be answered with a test response.", user: 1},
      {description: "This is test prompt 3, written by user_1, to be answered with a test response.", user: 1}
    ]

    fetchMock.get('/api/v1/prompts.json', {
      status: 200,
      body: prompts
    })
    wrapper = mount(
      <PromptsIndexContainer />
    )
  });

  afterEach(fetchMock.restore)

  it('should render an PromptsTile Component', (done) => {
    setTimeout(() => {
      expect(wrapper.find(PromptsTile)).toBePresent();
      done()
    }, 0)
  });
})
