import PromptsIndexContainer from '../../../app/javascript/react/containers/PromptsIndexContainer'
import PromptsTile from '../../../app/javascript/react/components/PromptsTile'

import fetchMock from 'fetch-mock'
import { shallow } from 'enzyme'

describe('PromptsIndexContainer', () => {
  let wrapper;

  beforeEach(() => {
    let fetchPrompts = {
      prompts: [ {id: 1, description: "This is test prompt 1, written by user_1, to be answered with a test response.", handle: "Nick", date_made: "05/09/2018"} ]
    }

    fetchMock.get('/api/v1/prompts.json', {
      status: 200,
      body: fetchPrompts
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
