import { shallowMount } from '@vue/test-utils';
import Card from '../../../src/views/widgets/Card.vue';

describe('<card/>', () => {
  it('should render correct contents', () => {
    const appInfo = {'im:image':[{label:''},{label:''}], 'im:name': '', category:{attributes: {label: ''}}}
    const wrapper = shallowMount(Card, {prop:{appInfo}});
    expect(wrapper.html())
      .toContain('div class="card"');
  });
});