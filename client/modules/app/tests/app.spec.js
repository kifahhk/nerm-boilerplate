import { renderComponent, expect } from '../../../util/test-helper';
import App from '../app';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('should has container', () => {
    expect(component.find('.container')).to.exist;
  });

});
