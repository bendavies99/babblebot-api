import { Application } from './../src/application';

// @ts-ignore

const BabbleBot = {
  registerApplication: (app: any) => {},
};

// @ts-ignore
global.BabbleBot = BabbleBot;

describe('Application', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application({ name: 'Test' });
  });

  it('Should return module from getModule', () => {
    expect(app.getModule()).toMatchObject({ name: 'Test' });
  });
});
